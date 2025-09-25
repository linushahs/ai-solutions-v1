import matplotlib
matplotlib.use('Agg')  # Use non-interactive Agg backend

from django.contrib import admin
from django.urls import path, reverse
from django.utils.html import format_html
from django.http import HttpResponse
from django.db.models import Count
from .models import Contact
import csv
import matplotlib.pyplot as plt
import io

# Custom action to export contacts to CSV
@admin.action(description="Export selected contacts to CSV")
def export_to_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = 'attachment; filename="contacts.csv"'
    writer = csv.writer(response)
    writer.writerow(["First Name", "Last Name", "Email", "Phone", "Job_type", "Country", "Address"])
    for contact in queryset:
        writer.writerow([contact.first_name, contact.last_name, contact.email, contact.phone, contact.job_type, contact.country, contact.address, contact.message])
    return response

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "phone", "job_type", "country", "address", "graph_link")
    list_filter = ("country", "job_type")
    search_fields = ("first_name", "last_name", "email", "phone", "country", "job_type")
    actions = [export_to_csv]
    # change_list_template = "admin/contact_changelist.html"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path("graph/", self.admin_site.admin_view(self.graph_view), name="contact_graph"),
        ]
        return custom_urls + urls

    def graph_view(self, request):
        # Data for Pie Chart: Distribution of Contacts by Country
        country_data = Contact.objects.values("country").annotate(count=Count("id"))
        countries = [entry["country"] for entry in country_data]
        country_counts = [entry["count"] for entry in country_data]

        # Data for Line Graph: Contacts by ID
        contact_ids = list(Contact.objects.values_list("id", flat=True))
        cumulative_counts = range(1, len(contact_ids) + 1)  # Cumulative count of contacts

        # Ensure data exists
        if not country_data or not contact_ids:
            return HttpResponse("No data available to generate the graph.", content_type="text/plain")

        # Create a figure with two subplots
        fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(6, 10))

        # Pie Chart
        if country_counts and countries:
            ax1.pie(country_counts, labels=countries, autopct='%1.1f%%', startangle=140, colors=plt.cm.tab20.colors)
            ax1.set_title("Contacts by Country", fontsize=14)

        # Line Graph
        ax2.plot(contact_ids, cumulative_counts, marker='o', linestyle='-', color='b')
        ax2.set_title("Contacts by ID", fontsize=12)
        ax2.set_xlabel("Contact ID", fontsize=10)
        ax2.set_ylabel("Cumulative Number of Contacts", fontsize=10)

        # Adjust layout
        plt.tight_layout()

        # Save to buffer
        buf = io.BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)
        plt.close()
        return HttpResponse(buf.getvalue(), content_type="image/png")

    def graph_link(self, obj):
         # This creates an absolute URL to your graph view
        url = reverse('admin:contact_graph')
        return format_html('<a href="{}">View Graph</a>', url)

    graph_link.short_description = "Graph"
