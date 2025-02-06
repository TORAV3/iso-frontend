webix.ui({
  view: "form",
  id: "loginForm",
  container: "login-card",
  css: "loginForm",
  elements: [
    {
      id: "row",
      margin: 10,
      rows: [
        {
          view: "text",
          name: "email",
          id: "email",
          label: "Email",
          labelPosition: "top",
          required: true,
          minWidth: 280,
        },
        {
          view: "text",
          type: "password",
          name: "password",
          id: "password",
          label: "Password",
          labelPosition: "top",
          required: true,
          minWidth: 280,
        },
        {
          view: "checkbox",
          labelRight: "Simpan Password",
          labelWidth: 0,
          value: 0,
        },
        { view: "button", value: "Masuk", css: "btnmasuk", click: submit_form },
        {
          view: "button",
          value: "Daftar",
          css: "btndaftar",
          click: gotoRegister,
        },
        // {
        //   template: `<hr/>`,
        //   borderless: true,
        //   height: 10,
        // },
        // {
        //   view: "button",
        //   label:
        //     "<img src='iso/images/google-icon.png' style='width:13px; margin-right: 14px'></img><span class='text'>Sign In with Google</span>",
        //   css: "btndaftar",
        // },
      ],
    },
  ],
  rules: {
    password: webix.rules.isNotEmpty,
    email: webix.rules.isEmail,
  },
});

function gotoRegister() {
  window.location.href = "/register";
}

function submit_form() {
  const form = $$("loginForm");
  if (form.validate()) {
    var formData = form.getValues();
    axios
      .post("http://localhost:3000/iso/api/login", formData)
      .then(function (response) {
        document.cookie = `token=${response.data.data}; path=/; max-age=${
          60 * 60
        }; Secure; SameSite=Strict`;
        form.clear();

        axios
          .get("http://localhost:3000/iso/api/login/data", {
            headers: {
              Authorization: "Bearer " + response.data.data,
            },
          })
          .then((res) => {
            webix.message({ type: "success", text: "Login berhasil" });
            if (res.data.data.type === "internal") {
              setTimeout(() => {
                window.location.href = "/user-access";
              }, 1300);
            } else {
              setTimeout(() => {
                window.location.href = "/kelas";
              }, 1300);
            }
          })
          .catch((err) => {
            webix.message({ type: "error", text: err.response.data.data });
          });
      })
      .catch(function (error) {
        webix.message({ type: "error", text: error.response.data.data });
      });
  }
}
