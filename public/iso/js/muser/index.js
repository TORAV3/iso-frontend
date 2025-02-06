// function loadUserData(status = "all") {
//   const url = `http://localhost:3000/iso/api/user/student?status=${status}`;

//   $$("userTable").showProgress({
//     type: "icon",
//   });

//   webix
//     .ajax()
//     .get(url)
//     .then(function (data) {
//       const response = data.json();
//       if (
//         response.status === 200 &&
//         response.data &&
//         response.data.length > 0
//       ) {
//         const transformedData = response.data.map(function (item) {
//           return {
//             id: item.id,
//             fullname: item.fullname.toUpperCase(),
//             email: item.email,
//             phone: item.phone,
//             status: item.status.toUpperCase(),
//           };
//         });

//         $$("userTable").clearAll();
//         $$("userTable").hideOverlay();
//         $$("userTable").parse(transformedData);
//       } else {
//         $$("userTable").clearAll();
//         $$("userTable").showOverlay("Maaf, data tidak ditemukan");
//       }
//     })
//     .catch(function (err) {
//       $$("userTable").clearAll();
//       $$("userTable").showOverlay("Failed to load data.");
//       webix.message({ type: "error", text: "Failed to load data" });
//       console.error("Error loading data:", err);
//     })
//     .finally(function () {
//       $$("userTable").hideProgress();
//     });
// }

// function updateUserStatus(userId, status) {
//   const url = `http://localhost:3000/iso/api/user/status/${userId}`;

//   const requestData = {
//     status: status,
//   };

//   webix
//     .ajax()
//     .put(url, requestData)
//     .then(function (data) {
//       loadUserData();
//     })
//     .catch(function (err) {
//       console.error("Error loading data:", err);
//     });
// }

// var myWin = webix.ui({
//   view: "window",
//   head: "Form Notifikasi User",
//   modal: true,
//   position: "center",
//   body: {
//     view: "form",
//     elements: [
//       {
//         view: "textarea",
//         label: "Pesan",
//         name: "message",
//         id: "message",
//         labelPosition: "top",
//         height: 150,
//       },
//       {
//         view: "button",
//         value: "Submit",
//         css: "btnmodalsave",
//         click: function (elementId, event) {
//           this.getParentView().getParentView().close();
//         },
//       },
//     ],
//   },
//   move: true,
// });

// webix.ready(function () {
//   grid = webix.ui({
//     container: "muser-index-page",
//     margin: 20,
//     rows: [
//       {
//         view: "toolbar",
//         paddingY: 2,
//         cols: [
//           {
//             view: "combo",
//             value: "all",
//             options: [
//               { id: "all", value: "All" },
//               { id: "register", value: "Register" },
//               { id: "approve", value: "Approve" },
//               { id: "reject", value: "Reject" },
//               { id: "revisi", value: "Revisi" },
//             ],
//             width: 100,
//             name: "status",
//             align: "left",
//             on: {
//               onChange: function (newValue) {
//                 loadUserData(newValue);
//               },
//             },
//           },
//           {},
//           {
//             maxWidth: 230,
//             minWidth: 160,
//             view: "text",
//             id: "textSearch",
//             placeholder: "Ketik disini untuk mencari data",
//             align: "right",
//             on: {
//               onTimedKeyPress: function () {
//                 $$("userTable").filterByAll();
//               },
//             },
//           },
//         ],
//       },
//       {
//         margin: 5,
//         rows: [
//           {
//             view: "datatable",
//             id: "userTable",
//             columns: [
//               { id: "id", hidden: true },
//               {
//                 id: "fullname",
//                 header: "Nama Lengkap",
//                 minWidth: 300,
//                 fillspace: true,
//                 sort: "string",
//               },
//               { id: "email", header: "Email", width: 240, sort: "string" },
//               { id: "phone", header: "No. HP", width: 170 },
//               {
//                 id: "status",
//                 header: { text: "Status", css: { "text-align": "center" } },
//                 css: { "text-align": "center" },
//                 width: 100,
//                 sort: "string",
//               },
//             ],
//             autoheight: true,
//             scheme: {
//               $change: function (obj) {
//                 if (obj.status.toLowerCase() === "approve") {
//                   obj.status = `<div class="row-green">${obj.status}</div>`;
//                 } else if (obj.status.toLowerCase() === "revisi") {
//                   obj.status = `<div class="row-yellow">${obj.status}</div>`;
//                 } else if (obj.status.toLowerCase() === "register") {
//                   obj.status = `<div class="row-blue">${obj.status}</div>`;
//                 } else {
//                   obj.status = `<div class="row-red">${obj.status}</div>`;
//                 }
//               },
//             },
//             navigation: true,
//             pager: "pager",
//           },
//           {
//             view: "pager",
//             id: "pager",
//             css: "pagerstyle",
//             template: "{common.prev()}{common.next()}",
//             size: 10,
//           },
//         ],
//       },
//     ],
//   });

//   webix.ui({
//     view: "contextmenu",
//     id: "cmenu",
//     master: $$("userTable"),
//     data: ["Detail", "Approve", "Revisi", "Reject"],
//     on: {
//       onItemClick: function (id) {
//         var context = this.getContext();
//         var rowId = context.id;
//         var rowData = $$("userTable").getItem(rowId);

//         var menuItem = this.getItem(id);
//         switch (menuItem.value) {
//           case "Detail":
//             window.location.href = `/admin/user/detail/${rowData.id}`;
//             break;
//           case "Approve":
//             updateUserStatus(rowData.id, "approve");
//             break;
//           case "Revisi":
//             myWin.show();
//             // updateUserStatus(rowData.id, "revisi");
//             break;
//           case "Reject":
//             updateUserStatus(rowData.id, "reject");
//             break;
//           default:
//             break;
//         }
//       },
//     },
//   });

//   $$("userTable").registerFilter(
//     $$("textSearch"),
//     { columnId: "fullname" },
//     {
//       getValue: function (view) {
//         return view.getValue();
//       },
//       setValue: function (view, value) {
//         view.setValue(value);
//       },
//     }
//   );

//   webix.extend($$("userTable"), webix.ProgressBar);

//   webix.event(window, "resize", function () {
//     grid.adjust();
//   });

//   loadUserData("all");
// });

function loadUserData(status = "all") {
  $$("table").showProgress({
    type: "icon",
  });

  axios
    .get(`http://localhost:3000/iso/api/user/student?status=${status}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.data.length > 0) {
        const transformedData = res.data.data.map(function (item) {
          return {
            id: item.id,
            fullname: item.fullname.toUpperCase(),
            email: item.email,
            phone: item.phone,
            status: item.status,
          };
        });

        $$("table").clearAll();
        $$("table").hideOverlay();
        $$("table").parse(transformedData);
      } else {
        $$("table").clearAll();
        $$("table").showOverlay("Maaf, data tidak ditemukan");
      }
    })
    .catch((err) => {
      $$("table").clearAll();
      $$("table").showOverlay("Failed to load data.");
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    })
    .finally(function () {
      $$("table").hideProgress();
    });
}

function updateUserStatus(userId, status) {
  const url = `http://localhost:3000/iso/api/user/status/${userId}`;

  const requestData = {
    status: status,
  };

  webix
    .ajax()
    .headers({ Authorization: "Bearer " + token })
    .put(url, requestData)
    .then(function (data) {
      loadUserData();
    })
    .catch(function (err) {
      console.error("Error loading data:", err);
    });
}

function deleteUser(id) {
  axios
    .delete(`http://localhost:3000/iso/api/user/internal/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      webix.message({ type: "success", text: res.data.data });
      loadUserData();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

var myWin = webix.ui({
  view: "window",
  head: "Form Notifikasi User",
  modal: true,
  position: "center",
  body: {
    view: "form",
    elements: [
      {
        view: "textarea",
        label: "Pesan",
        name: "message",
        id: "message",
        labelPosition: "top",
        height: 150,
      },
      {
        view: "button",
        value: "Submit",
        css: "btnmodalsave",
        click: function (elementId, event) {
          this.getParentView().getParentView().close();
        },
      },
    ],
  },
  move: true,
});

var statusCombo = {
  view: "combo",
  value: "all",
  options: [
    { id: "all", value: "All" },
    { id: "register", value: "Register" },
    { id: "approve", value: "Approve" },
    { id: "reject", value: "Reject" },
    { id: "revisi", value: "Revisi" },
    { id: "reviewed", value: "Reviewed" },
  ],
  width: 110,
  name: "status",
  align: "left",
  on: {
    onChange: function (newValue) {
      loadUserData(newValue);
    },
  },
};

var searchForm = {
  maxWidth: 230,
  minWidth: 160,
  view: "text",
  id: "textSearch",
  placeholder: "Ketik disini untuk mencari data",
  align: "right",
  on: {
    onTimedKeyPress: function () {
      $$("table").filterByAll();
    },
  },
};

var toolbar = {
  view: "toolbar",
  paddingY: 2,
  cols: [statusCombo, {}, searchForm],
};

var detail =
  "<span class='webix_icon me-1 detailBtn' style='cursor:pointer;'><iconify-icon icon='solar:pen-new-round-linear' style='color:#398bf1;'></iconify-icon></span>";
var trash =
  "<span class='webix_icon delBtn' style='cursor:pointer;'><iconify-icon icon='solar:trash-bin-2-linear' style='color:red;'></iconify-icon></span>";

var tabcols = [
  { id: "id", hidden: true },
  {
    id: "action",
    header: { text: "Action", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
  },
  {
    id: "fullname",
    header: "Nama Lengkap",
    minWidth: 300,
    fillspace: true,
    sort: "string",
  },
  { id: "email", header: "Email", width: 240, sort: "string" },
  { id: "phone", header: "No. HP", width: 170 },
  {
    id: "status",
    header: { text: "Status", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
    sort: "string",
  },
];

var table = {
  view: "datatable",
  id: "table",
  columns: tabcols,
  autoheight: true,
  onClick: {
    delBtn: function (event, id, node) {
      deleteUser(id.row);
    },
    detailBtn: function (event, id, node) {
      window.location.href = `/manajemen-user/detail/${id.row}`;
    },
  },
  scheme: {
    $change: function (obj) {
      obj.action = detail + trash;
      var css;
      switch (obj.status) {
        case "approve":
          css = "row-green";
          break;
        case "reject":
          css = "row-red";
          break;
        case "reviewed":
          css = "row-orange";
          break;
        case "register":
          css = "row-blue";
          break;
        case "revisi":
          css = "row-purple";
          break;
        default:
          break;
      }
      obj.status = `<div class=${css}>${obj.status.toUpperCase()}</div>`;
    },
  },
  navigation: true,
  pager: "pager",
};

var pagination = {
  view: "pager",
  id: "pager",
  css: "pagerstyle",
  template: "{common.prev()}{common.next()}",
  size: 10,
};

var datatable = {
  margin: 5,
  rows: [table, pagination],
};

var title = {
  view: "template",
  template: "Data Pendaftar",
  autoheight: true,
  css: "title",
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 20,
    rows: [title, toolbar, datatable],
  });

  webix.ui({
    view: "contextmenu",
    id: "cmenu",
    master: $$("table"),
    data: ["Approve", "Revisi", "Reject"],
    on: {
      onItemClick: function (id) {
        var context = this.getContext();
        var rowId = context.id;
        var rowData = $$("table").getItem(rowId);

        var menuItem = this.getItem(id);
        switch (menuItem.value) {
          case "Approve":
            updateUserStatus(rowData.id, "approve");
            break;
          case "Revisi":
            // myWin.show();
            updateUserStatus(rowData.id, "revisi");
            break;
          case "Reject":
            updateUserStatus(rowData.id, "reject");
            break;
          default:
            break;
        }
      },
    },
  });

  $$("table").registerFilter(
    $$("textSearch"),
    { columnId: "fullname" },
    {
      getValue: function (view) {
        return view.getValue();
      },
      setValue: function (view, value) {
        view.setValue(value);
      },
    }
  );

  webix.extend($$("table"), webix.ProgressBar);

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadUserData();
});
