var control;

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
  } else if (document.getElementById("control-placeholder").value == "") {
    alert("Please enter a placeholder");
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
    var controlClass = document.getElementById("control-class").value;
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
    console.log(control);
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

  //empty fields
  document.getElementById("control-type").value = "Select Type";
  document.getElementById("control-id").value = "";
  document.getElementById("control-name").value = "";
  document.getElementById("control-placeholder").value = "";
  document.getElementById("control-value").value = "";
  document.getElementById("control-class").value = "";
  document.getElementById("txtScript").value = "";
  document.getElementById("control-type").focus();
  document.getElementById("lbl-control-heading").innerHTML = "";
}

var controls = [];
var scripts = [];
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
