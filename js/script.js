var control;
var controls = [];
var scripts = [];

(function () {
  createForm();
})();

function createForm() {
  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "index.php");
  form.setAttribute("id", "form");
  document.getElementById("form-container").appendChild(form);
}

function createControl() {
  if (document.getElementById("control-type").value == "Select Type") {
    alert("Please select a type");
    return;
  } else if (document.getElementById("control-id").value == "") {
    alert("Please enter an ID");
    return;
  } else if (document.getElementById("control-name").value == "") {
    alert("Please enter a name");
    return;
  } else if (document.getElementById("control-class").value == "") {
    alert("Please enter a class");
    return;
  } else {
    var controlType = document.getElementById("control-type").value;
    var controlId = document.getElementById("control-id").value;
    var controlName = document.getElementById("control-name").value;
    var controlPlaceholder = document.getElementById(
      "control-placeholder"
    ).value;
    var controlValue = document.getElementById("control-value").value;
    var controlClass = "";
    var classdata = $("#control-class").select2("data");

    for (let index = 0; index < classdata.length; index++) {
      controlClass = controlClass + " " + classdata[index].text;
    }

    if (controlType == "textarea") {
      control = document.createElement("textarea");
    } else {
      control = document.createElement("input");
    }

    control.setAttribute("type", controlType);
    control.setAttribute("id", controlId);
    control.setAttribute("name", controlName);
    control.setAttribute("placeholder", controlPlaceholder);
    control.setAttribute("value", controlValue);
    control.setAttribute("class", controlClass);

    addControl({
      type: controlType,
      id: controlId,
      name: controlName,
      placeholder: controlPlaceholder,
      value: controlValue,
      class: controlClass,
    });

    document.getElementById("form").appendChild(control);

    if (document.getElementById("txtScript").value != "") {
      var code = document.getElementById("txtScript").value;
      var script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.innerHTML = code;
      document.body.appendChild(script);
      addScript(code);
    }
  }

  emptyFields();
}

function addControl(control) {
  controls.push(control);
}

function addScript(code) {
  scripts.push(code);
}

function getControls() {
  return controls;
}

function getScripts() {
  return scripts;
}

function createLable() {
  var lable = document.createElement("label");
  lable.innerHTML = "Label";
  addControl(lable);
}

function createInput() {
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "input");
  input.setAttribute("placeholder", "Input");
  document.getElementById("form").appendChild(input);
  addControl(input);
}

function createFileUploader() {
  var fileUploader = document.createElement("input");
  fileUploader.setAttribute("type", "file");
  fileUploader.setAttribute("name", "fileUploader");
  fileUploader.setAttribute("placeholder", "File Uploader");
  document.getElementById("form").appendChild(input);
  addControl(fileUploader);
}

function createTextArea() {
  var textArea = document.createElement("textarea");
  textArea.setAttribute("name", "textArea");
  textArea.setAttribute("placeholder", "Textarea");
  document.getElementById("form").appendChild(input);
  addControl(textArea);
}

function createButton() {
  var button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("name", "button");
  document.getElementById("form").appendChild(input);
  addControl(button);
}

function emptyFields() {
  document.getElementById("control-type").value = "Select Type";
  document.getElementById("control-id").value = "";
  document.getElementById("control-name").value = "";
  document.getElementById("control-placeholder").value = "";
  document.getElementById("control-value").value = "";
  $("#control-class").select2("val", "");
  document.getElementById("txtScript").value = "";
  document.getElementById("control-type").focus();
  document.getElementById("lbl-control-heading").innerHTML = "";
}

function saveJson() {
  if (getControls().length > 0) {
    var obj = {};
    obj.controls = getControls();
    if (getScripts().length > 0) {
      obj.scripts = getScripts();
    }
    var json = JSON.stringify(obj);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "form.json";
    a.click();
  } else {
    alert("No controls to save");
  }
}

function format(state) {
  if (!state.id) return state.text; // optgroup
  return state.text;
}

$("#control-class").select2({
  placeholder: "Select Bootstrap Classes",
  matcher: function (term, text, opt) {
    var matcher = opt.parent("select").select2.defaults.matcher;
    return (
      matcher(term, text) ||
      (opt.parent("optgroup").length &&
        matcher(term, opt.parent("optgroup").attr("label")))
    );
  },
});

var scriptBox = document.getElementById("txtScript");
scriptBox.placeholder = scriptBox.placeholder.replace(/\\n/g, "\n");