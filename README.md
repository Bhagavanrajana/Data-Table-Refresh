# Editable Contact DataTable with Refresh (LWC + Apex)

This project is a Salesforce Lightning Web Component (LWC) that displays a list of Contacts in a data table with **inline editing**. It supports saving updates to Salesforce using `updateRecord` and refreshes the data using `refreshApex`.

---

## Features

- Fetches Contacts from Salesforce using Apex (`@AuraEnabled(cacheable=true)`)
- Editable columns for First Name, Last Name, and Email
- Inline editing with `lightning-datatable`
- Saves updates using `updateRecord` from `lightning/uiRecordApi`
- Refreshes data after save using `refreshApex`
- Toast messages for success and error notifications
