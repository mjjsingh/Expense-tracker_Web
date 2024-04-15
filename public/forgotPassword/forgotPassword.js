const forgotemail = document.getElementById("forgotemail");
const forgotemailbtn = document.getElementById("forgotemailbtn");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const message = document.getElementById("message");
const apiUrl = "http://13.127.249.108:3000";
// const apiUrl = "http://localhost:3000";

forgotemailbtn.addEventListener("click", async () => {
  let foremail = forgotemail.value;
  console.log(foremail);
  let obj = {
    email: foremail,
  };
  console.log(obj);
  try {
    const response = await fetch(`${apiUrl}/api/reset/forgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
    const data = response.json();
    console.log(data);
    forgotPasswordForm.style.display = "none";
    // Show the message
    message.style.display = "block";

    // Set a timer to close the tab after 30 seconds
    setTimeout(function () {
      window.close(); // Close the tab
    }, 3000);
  } catch (err) {
    console.error(err);
  }
});