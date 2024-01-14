import { get_access_token } from "./auth";
function get_data(url, appContext) {
  // appContext.setLoad(true);
  return fetch(url, {
    method: "get",
    headers: new Headers({
      "Content-Type": "application/json",
      "access-token": get_access_token(),
      client: "web",
    }),
  })
    .then(function (res) {
      // appContext.setLoad(false);
      return res.json();
    })
    .then(function (data) {
      if (data.error && data.error.status_code == 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      if (data.error) {
        throw new Error(data.error.message);
      }
      return data;
    })
    .catch(function (error) {
      appContext.setAlert(error.message, "alert_error");
      appContext.setLoad(false);
    });
}

function post_data(url, data, appContext, show) {
  appContext.setLoad(true);
  return fetch(url, {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json",
      "access-token": get_access_token(),
    }),
    body: JSON.stringify(data),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data?.status_code == 4003) {
        throw new Error(data.success_msg);
      }
      if (data?.status_code == 4005) {
        return data;
      }
      if (data.error) {
        throw new Error(data.error.message);
      }
      appContext.setLoad(false);
      appContext.setReload(!appContext.reload);
      show && appContext.setAlert(data.message, "alert_success");
      return data;
    })
    .catch(function (error) {
      appContext.setAlert(error.message, "alert_error");
      appContext.setLoad(false);
    });
}

function post_data_without_reload(url, data, appContext, show) {
  appContext.setLoad(true);
  return fetch(url, {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json",
      "access-token": get_access_token(),
    }),
    body: JSON.stringify(data),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data?.status_code == 4003) {
        throw new Error(data.success_msg);
      }
      if (data?.status_code == 4005) {
        return data;
      }
      if (data.error) {
        throw new Error(data.error.message);
      }
      appContext.setLoad(false);
      show && appContext.setAlert(data.message, "alert_success");
      return data;
    })
    .catch(function (error) {
      appContext.setAlert(error.message, "alert_error");
      appContext.setLoad(false);
    });
}

function put_data(url, data, appContext, show) {
  return fetch(url, {
    method: "put",
    headers: new Headers({
      "Content-Type": "application/json",
      "access-token": get_access_token(),
    }),
    body: JSON.stringify(data),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data.error) {
        throw new Error(data.error.message);
      }
      appContext.setLoad(false);
      appContext.setReload(!appContext.reload);
      show && appContext.setAlert(data.message, "alert_success");
      return data;
    })
    .catch(function (error) {
      // console.log(error, error.msg, error.message);
      appContext.setAlert(error.message, "alert_error");
      appContext.setLoad(false);
    });
}
function download_blob(url, appContext) {
  return fetch(url, {
    method: "get",
    headers: new Headers({
      "Content-Type": "application/vnd.ms-excel",
      responseType: "arraybuffer",
      "access-token": get_access_token(),
    }),
  })
    .then(function (res) {
      return res.blob();
    })
    .then(function (data) {
      let newBlob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(newBlob);
      link.setAttribute("download", "download.xlsx");
      link.click();
    })
    .catch(function (error) {
      appContext.setAlert(error.message, "alert_error");
      appContext.setLoad(false);
    });
}
function patch_data(url, data, appContext, show) {
  return fetch(url, {
    method: "PATCH",
    headers: new Headers({
      "Content-Type": "application/json",
      "access-token": get_access_token(),
    }),
    body: JSON.stringify(data),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data.error) {
        throw new Error(data.error.message);
      }
      appContext.setLoad(false);
      appContext.setReload(!appContext.reload);
      show && appContext.setAlert(data.message, "alert_success");
      return data;
    })
    .catch(function (error) {
      // console.log(error, error.msg, error.message);
      appContext.setAlert(error.message, "alert_error");
      appContext.setLoad(false);
    });
}
function delete_data(url, appContext, show) {
  return fetch(url, {
    method: "delete",
    headers: new Headers({
      "Content-Type": "application/json",
      "access-token": get_access_token(),
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data.error) {
        throw new Error(data.error.message);
      }
      appContext.setLoad(false);
      appContext.setReload(!appContext.reload);
      show && appContext.setAlert(data.message, "alert_success");
      return data;
    })
    .catch(function (error) {
      appContext.setAlert(error.message, "alert_error");
      appContext.setLoad(false);
    });
}

function post_img(url, fd) {
  return false;
  return fetch(url, {
    method: "post",
    body: fd,
    headers: new Headers({
      "Content-Type": "application/json",
      "access-token": get_access_token(),
    }),
  }).then(function (res) {
    return res.json();
  });
}
export {
  get_data,
  post_data,
  put_data,
  patch_data,
  post_img,
  delete_data,
  download_blob,
  post_data_without_reload,
};
