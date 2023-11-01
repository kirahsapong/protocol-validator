import { Web5 } from "https://cdn.jsdelivr.net/npm/@web5/api@0.8.1/dist/browser.mjs";

const loading = document.querySelector("#loading");
const content = document.querySelector("#content");
const protocolForm = document.querySelector("#protocol-form");
const protocolInput = document.querySelector("#protocol-input");
const protocolButton = document.querySelector("#protocol-button");
const protocolMessages = document.querySelector("#protocol-messages");
const protocolSuccess = document.querySelector("#protocol-success");
const protocolError = document.querySelector("#protocol-error");
const protocolResults = document.querySelector("#protocol-results");

const recordForm = document.querySelector("#record-form");
const recordInput = document.querySelector("#record-input");
const recordButton = document.querySelector("#record-button");
const recordMessages = document.querySelector("#record-messages");
const recordSuccess = document.querySelector("#record-success");
const recordError = document.querySelector("#record-error");
const recordResults = document.querySelector("#record-results");

const sendForm = document.querySelector("#send-form");
const sendInput = document.querySelector("#send-input");
const sendButton = document.querySelector("#send-button");
const sendMessages = document.querySelector("#send-messages");
const sendSuccess = document.querySelector("#send-success");
const sendError = document.querySelector("#send-error");

const { web5, did } = await Web5.connect();
console.log(did);

if (web5) {
  // Remove loading on successful load of web5
  document.body.removeChild(loading);
  content.style.visibility = "visible";

  // Create record variable for sending later
  let recordToSend;

  // Handle user input of a protocol
  protocolInput.oninput = (e) => {
    if (e.currentTarget.value) {
      protocolButton.removeAttribute("disabled");
    } else {
      if (protocolError.textContent) {
        protocolMessages.classList.remove("error");
        protocolError.textContent = "";
      }
      if (protocolSuccess.textContent) {
        protocolMessages.classList.remove("success");
        protocolSuccess.textContent = "";
      }
      protocolButton.setAttribute("disabled", "true");
    }
  };

  recordInput.oninput = (e) => {
    if (e.currentTarget.value) {
      recordButton.removeAttribute("disabled");
    } else {
      if (recordError.textContent) {
        recordMessages.classList.remove("error");
        recordError.textContent = "";
      }
      if (recordSuccess.textContent) {
        recordMessages.classList.remove("success");
        recordSuccess.textContent = "";
        if (recordToSend) {
          recordToSend = undefined;
          recordButton.setAttribute("disabled", "true");
        }
      }
      recordButton.setAttribute("disabled", "true");
    }
  };

  sendInput.oninput = (e) => {
    if (e.currentTarget.value) {
      sendButton.removeAttribute("disabled");
    } else {
      if (sendError.textContent) {
        sendMessages.classList.remove("error");
        sendError.textContent = "";
      }
      if (sendSuccess.textContent) {
        sendMessages.classList.remove("success");
        sendSuccess.textContent = "";
      }
      sendButton.setAttribute("disabled", "true");
    }
  };

  protocolForm.onsubmit = async (e) => {
    e.preventDefault();
    protocolMessages.classList.remove("error");
    protocolError.textContent = "";
    protocolMessages.classList.remove("success");
    protocolSuccess.textContent = "";
    protocolResults.replaceChildren([]);
    if (protocolInput.value) {
      try {
        const protocolDefinition = JSON.parse(protocolInput.value);
        console.log(protocolDefinition);
        // Install the protocol
        const { protocol, status } = await web5.dwn.protocols.configure({
          message: {
            definition: protocolDefinition,
          },
        });
        console.log(protocol, status);
        if (protocol) {
          protocolMessages.classList.add("success");
          protocolSuccess.textContent =
            "Successfully installed protocol. Protocol types found:";
          for (const type in protocolDefinition.types) {
            const listItem = document.createElement("li");
            const code = document.createElement("code");
            code.textContent = type;
            listItem.appendChild(code);
            protocolResults.append(listItem);
          }
        } else {
          protocolMessages.classList.add("error");
          protocolError.textContent = `Error installing/configuring the protocol: ${status.detail}. Please correct the error and try again.`;
        }
      } catch (e) {
        console.error(e);
        protocolMessages.classList.remove("success");
        protocolSuccess.textContent = "";
        protocolMessages.classList.add("error");
        protocolError.textContent = `Error parsing or handling protocol. Please check the protocol and try again: ${e}`;
      }
    }
  };

  recordForm.onsubmit = async (e) => {
    e.preventDefault();
    recordMessages.classList.remove("error");
    recordError.textContent = "";
    recordMessages.classList.remove("success");
    recordSuccess.textContent = "";
    recordResults.replaceChildren([]);
    if (recordInput.value) {
      try {
        const recordPayload = JSON.parse(recordInput.value);
        // Write the record
        const { record, status } = await web5.dwn.records.write(recordPayload);
        console.log(record, status);
        if (record) {
          recordToSend = record;
          recordMessages.classList.add("success");
          recordSuccess.textContent =
            "Successfully wrote record. Record IDs found:";
          for (const idKey of ["id", "contextId", "parentId"]) {
            const listItem = document.createElement("li");
            const code1 = document.createElement("code");
            code1.textContent = idKey;
            listItem.appendChild(code1);
            listItem.append(": ");
            const code2 = document.createElement("code");
            code2.textContent = record[idKey];
            listItem.appendChild(code2);
            recordResults.append(listItem);
          }
        } else {
          recordMessages.classList.add("error");
          recordError.textContent = `Error writing the record: ${status.detail}. Please correct the error and try again.`;
        }
      } catch (e) {
        console.error(e);
        recordMessages.classList.remove("success");
        recordSuccess.textContent = "";
        recordMessages.classList.add("error");
        recordError.textContent = `Error parsing or handling record. Please check the record and try again: ${e}`;
      }
    }
  };

  sendForm.onsubmit = async (e) => {
    e.preventDefault();
    sendMessages.classList.remove("error");
    sendError.textContent = "";
    sendMessages.classList.remove("success");
    sendSuccess.textContent = "";
    if (sendInput.value && recordToSend) {
      try {
        // Send the record
        const { status } = await recordToSend.send(sendInput.value);
        console.log(status);
        if (status.code === 202) {
          sendMessages.classList.add("success");
          sendSuccess.textContent = `Successfully sent record with ID "${recordToSend.id}"`;
        } else {
          sendMessages.classList.add("error");
          sendError.textContent = `Error sending the record: ${status.detail}. Please correct the error and try again.`;
        }
      } catch (e) {
        console.error(e);
        sendMessages.classList.remove("success");
        sendSuccess.textContent = "";
        sendMessages.classList.add("error");
        sendError.textContent = `Error parsing or handling the DID or sending the record. Please check both and try again: ${e}`;
      }
    }
  };
} else {
  // If web5 fails to load, inform the user
  loading.textContent = "Error loading Web5";
}
