import Ajv from 'ajv/dist/2019';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const options = [
  {
    label: 'Developer',
    value: 'developer',
  },
  {
    label: 'Tester',
    value: 'tester',
  },
  {
    label: 'Product owner',
    value: 'product-owner',
  },
  {
    label: 'Project manager',
    value: 'project-manager',
  },
  {
    label: 'Businessman',
    value: 'businessman',
  },
];

// Used to validate submitted response by ajv 
const validatorSchema = {
  title: 'Guest',
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    workExperience: {
      description: 'Work experience in years',
      type: 'integer',
      minimum: 0,
      maximum: 100,
    },
    profession: 
        // For testing: intentionally create an error: only the first two options are actually allowed
        // by the validator in this case (Developer and Tester). The rest generate an error
        // when submitting.
        {type: "string", anyOf: options.slice(0, 2).map(o => ({const: o.value}))}
    ,
  },
  required: ['firstName', 'lastName'],
};

// Used to generate the form by Uniforms
const uniformsSchema = {
  ...validatorSchema,
  properties: {
    ...validatorSchema.properties,
    profession: {
      // ...validatorSchema.properties.profession,
      // The Uniforms bridge will try to map the "anyOf" value to a React DOM attribute,
      // leading to a warning.
      // So here we leave it open as a generic "string".
      // Might be related to this: https://uniforms.tools/docs/api-bridges/#note-on-allofanyofoneof
      type: "string",
      options,
    }
  }
}

const ajv = new Ajv({ allErrors: true, useDefaults: true, strict: true });

function createValidator(schema: object) {
  const validator = ajv.compile(schema);

  return (model: object) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const schemaValidator = createValidator(validatorSchema);

export const bridge = new JSONSchemaBridge(uniformsSchema, schemaValidator);