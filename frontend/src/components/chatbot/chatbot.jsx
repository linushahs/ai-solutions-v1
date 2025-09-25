import React from "react";
import ChatBot from "react-chatbotify";

function Chatbot() {
  // const [form, setForm] = React.useState({});
  // const formStyle = {
  //   marginTop: 10,
  //   marginLeft: 20,
  //   border: "1px solid #491d8d",
  //   padding: 10,
  //   borderRadius: 5,
  //   maxWidth: 300,
  // };

  const flow = {
    start: {
      message: "Hello! How can we help you?",
      path: "services",
    },
    services: {
      message:
        "We provide services in the following areas:" +
        " Web Development, " +
        "Mobile Development, " +
        "AI Solutions, " +
        "Other",
      path: "further",
      transition: { duration: 1000 },
    },
    further: {
      message: "What do you want to know further?",
      path: "askBusinessType",
    },
    askBusinessType: {
      message: "What is your business type?",
      chatDisabled: true,
      checkboxes: {
        items: ["E-commerce", "Healthcare", "Startup", "Education", "Other"],
        min: 1,
      },
      path: "provideInfo",
    },
    provideInfo: {
      message: "Great! What would you like to know about us?",
      chatDisabled: true,
      options: ["Portfolio", "Solutions", "Contact", "Blogs"],
      path: "process_options",
    },
    unknown_input: {
      message:
        "Sorry, I do not understand your message 😢! If you require further assistance, you may click on " +
        "the Github option and open an issue there or visit our discord.",
      path: "process_options",
    },
    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        let link = "";
        switch (params.userInput) {
          case "Portfolio":
            link = "http://localhost:5173/portfolio";
            break;
          case "Solutions":
            link = "http://localhost:5173/solutions";
            break;
          case "Contact":
            link = "http://localhost:5173/contactus";
            break;
          case "Blogs":
            link = "http://localhost:5173/blogs";
            break;
          default:
            return "unknown_input";
        }

        await params.injectMessage("Sit tight! I'll send you right there!");
        setTimeout(() => {
          window.open(link);
        }, 1000);
        return "repeat";
      },
    },
    repeat: {
      transition: { duration: 3000 },
      path: "start",
    },
  };

  return (
    <ChatBot
      settings={{
        tooltip: { text: "Chat with me" },
        header: { title: "AI Solutions", showAvatar: false },
        chatButton: { icon: "/chat-icon.png" },
      }}
      flow={flow}
    />
  );
}

export default Chatbot;
