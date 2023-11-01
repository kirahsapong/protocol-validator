# Protocol Validator

## Introduction

This project offers a faster feedback loop for validating protocols and protocol structure in a test browser [DWN](https://developer.tbd.website/docs/web5/learn/decentralized-web-nodes). This should help you explore and validate your [protocol types and structures](https://developer.tbd.website/docs/web5/learn/protocols). It might also help with debugging your [Web5](https://github.com/TBD54566975/web5-js) application when working with DWN protocols.

To get started, you can [run it locally](#local-development) or check out the [live demo](https://radiant-semifreddo-af73bb.netlify.app).

## Usage

The app will spin up a test DWN in your browser for you. Follow the steps to install a protocol into your test DWN and write records against the protocol paths:

### Installing a protocol

1. In the first field, paste a [Protocol Definition](https://developer.tbd.website/docs/web5/learn/protocols#defining-a-protocol) in valid JSON format.
2. Click `Install` to install the protocol into your test browser DWN.
3. If the protocol is installed successfully, you should see the protocol `types` that you included in your protocol displayed back to you.

### Writing a record

4. In the second field, paste a [Record Write/Create Request Payload](https://developer.tbd.website/api/web5-js/dwn/records/#createrequest) in valid JSON format.
5. Click `Check` to check the result of your Record Write/Create Request.
6. If the record is successfully created, you should see the `recordId`, `contextId`, and `parentId` associated with the resulting record displayed back to you.
7. Copy the `contextId` and/or `parentId` for use in subsequent child record writes.

For example, let's say you have three types `blogpost`, `image`, and `alt_text`. If you write a record to a `protocolPath` called `'blogpost'`, save that record's `contextId`. You can use it as the `contextId` for a new record at a `protocolPath` called `'blogpost/image'`.

Going further, you can save your `'blogpost/image'` record's `id` and `contextId` to use them as the `parentId` and `contextId` respectively for another new record at a `protocolPath` called `'blogpost/image/alt_text'`.

### Sending a record

8. Make sure the details of the record you just created are still visible to you for this next part: In the third field, paste a [DID](https://developer.tbd.website/docs/web5/learn/decentralized-identifiers) pointing to another DWN.
9. Click `Send` to check the result of your attempt to send your record to another DID's DWN.
10. If the send operation is successful, you should see a success message with the correct record's `id` displayed back to you.

### Additional Notes

- Your DID is logged to the console for easy access. If you open a browser window in a private browsing context in addition to your existing session, you can experiment with sending records between two different DIDs.
- Resulting protocols, records, and sends are also logged to the console for further inspection if needed.

### Protocol Definition Vectors

If you don't have a protocol definition ready to test out, you can get started with one of the [protocol definition test vectors](https://github.com/TBD54566975/dwn-sdk-js/tree/main/tests/vectors/protocol-definitions) shared in the [DWN SDK](https://github.com/TBD54566975/dwn-sdk-js).

## Local development

### Prerequisites

- Node - [Installation](https://nodejs.org/en/download)
- Npm - [Installation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Nvm (recommended) - [Installation](https://github.com/nvm-sh/nvm#installing-and-updating)

### Getting started

1. Clone this repository and `cd` into the project.

```
$ git clone https://github.com/kirahsapong/protocol-validator.git
$ cd protocol-validator
```

2. Run the code in your browser

```
$ npx http-server . -o -c-1
```

## Project Resources

| Resource                                   | Description                                                                   |
| ------------------------------------------ | ----------------------------------------------------------------------------- |
| [CODEOWNERS](./CODEOWNERS)                 | Outlines the project lead(s)                                                  |
| [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) | Expected behavior for project contributors, promoting a welcoming environment |
| [CONTRIBUTING.md](./CONTRIBUTING.md)       | Developer guide to build, test, run, access CI, chat, discuss, file issues    |
| [GOVERNANCE.md](./GOVERNANCE.md)           | Project governance                                                            |
| [LICENSE](./LICENSE)                       | Apache License, Version 2.0                                                   |
