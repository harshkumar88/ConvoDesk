const data = [
  {
    key: "Text",
    label: "Text",
    field_type: "text",
    choices: [],
    parent_field: "",
  },
  {
    key: "Issue",
    label: "Issue",
    field_type: "dependent",
    parent_field: "",
    choices: [
      {
        id: "8ff09a13-9900-41d5-a2a8-53bd8430e4b9",
        key: "issue",
        label: "26273",
        choices: [
          {
            id: "ed091e49-8bd4-47ed-b439-c90fdcc9b948",
            key: "sub_issue",
            label: "2327",
            choices: [
              {
                id: "33c6ece0-7648-4d4a-85ad-929d5826c77c",
                key: "further_breakup",
                label: "234",
                choices: [],
              },
            ],
          },
        ],
      },
      {
        id: "93e356d7-8d97-45f3-a243-fb5f02c1a5c3",
        key: "issue",
        label: "dahda",
        choices: [],
      },
    ],
  },
  {
    field_type: "dependent",
    parent_field: "",
    label: "Test",
    key: "s",
    choices: [
      {
        id: "abea8395-d129-4f84-9905-a522a0b3c3e2",
        key: "issue",
        label: "1",
        choices: [
          {
            id: "f59a2ad6-b7ce-4eb6-8316-045314ea9d0b",
            key: "sub_issue",
            label: "e",
            choices: [
              {
                id: "a6d5b0bf-61c1-4434-acc3-33e5b6d10b5f",
                key: "further_breakup",
                label: "d",
                choices: [],
              },
            ],
          },
        ],
      },
      {
        id: "ae01fab3-a583-407f-907d-9a883c3ab95e",
        key: "issue",
        label: "d",
        choices: [],
      },
    ],
  },
];

const fieldData = [
  { name: "INTEGER", value: "integer" },
  { name: "TEXT", value: "text" },
  { name: "BOOLEAN", value: "boolean" },
  { name: "DATE_TIME", value: "date-time" },
  { name: "DEPENDENT", value: "dependent" },
  { name: "MULTI_SELECT", value: "multi-select" },
];

export { data, fieldData };
