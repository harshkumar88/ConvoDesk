const data = {
  config: {
    id: "65a9104e039cfb52264ff051",
    created_at: "2024-01-18T11:49:34.610000Z",
    updated_at: "2024-01-18T11:49:34.610000Z",
    is_deleted: false,
    automation_execution: "all",
    ticket_fields: [
      {
        label: "Batch Number",
        key: "batch_number",
        field_type: "text",
        parent_field: "",
        is_required: false,
      },
      {
        label: "Issue",
        key: "issue",
        field_type: "dependent",
        parent_field: "",
        is_required: false,
        choices: [
          {
            id: "6fe50e3f-ca4a-4548-8595-9fed2deae2e3",
            key: "issue",
            label: "test1",
            choices: [
              {
                id: "76c71f60-a2d5-4c60-aafa-880caeb00ade",
                key: "sub_issue",
                label: "test2",
                choices: [
                  {
                    id: "db6ab155-1038-403a-a831-a0c13db70dea",
                    key: "further_breakup",
                    label: "test3",
                    choices: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: "Test",
        key: "s",
        field_type: "dependent",
        parent_field: "",
        is_required: false,
      },
      {
        label: "Text Label",
        key: "test",
        field_type: "text",
        parent_field: "",
        is_required: false,
      },
      {
        label: "Dependent Label",
        key: "testing",
        field_type: "dependent",
        parent_field: "",
        is_required: false,
      },
    ],
    breaks: [
      {
        label: "Lunch",
        added_by: "abcdf",
      },
    ],
    organisation: {
      id: "65a6795759e42b75cab8d2e2",
    },
  },
  field_dict: {
    batch_number: {
      label: "Batch Number",
    },
    issue: {
      label: "Issue",
    },
    s: {
      label: "Test",
    },
    test: {
      label: "Text Label",
    },
    testing: {
      label: "Dependent Label",
    },
  },
  success: true,
};

const fieldData = [
  { name: "INTEGER", value: "integer" },
  { name: "TEXT", value: "text" },
  { name: "BOOLEAN", value: "boolean" },
  { name: "DATE_TIME", value: "date-time" },
  { name: "DEPENDENT", value: "dependent" },
  { name: "MULTI_SELECT", value: "multi-select" },
];

const payload = {
  ticket_fields: [
    {
      key: "batch_number",
      label: "Batch Number",
      field_type: "text",
      parent_field: "",
    },
    {
      key: "issue",
      label: "Issue",
      field_type: "dependent",
      parent_field: "",
    },
    {
      field_type: "dependent",
      parent_field: "",
      label: "Test",
      key: "s",
    },
    {
      field_type: "text",
      parent_field: "",
      label: "Text Label",
      key: "test",
    },
    {
      field_type: "dependent",
      parent_field: "",
      label: "Dependent Label",
      key: "testing",
    },
  ],
  options: {
    key: "issue",
    choices: [
      {
        id: "6fe50e3f-ca4a-4548-8595-9fed2deae2e3",
        key: "issue",
        label: "test1",
        choices: [
          {
            id: "76c71f60-a2d5-4c60-aafa-880caeb00ade",
            key: "sub_issue",
            label: "test2",
            choices: [
              {
                id: "db6ab155-1038-403a-a831-a0c13db70dea",
                key: "further_breakup",
                label: "test3",
                choices: [],
              },
            ],
          },
        ],
      },
    ],
  },
};

export { data, fieldData };
