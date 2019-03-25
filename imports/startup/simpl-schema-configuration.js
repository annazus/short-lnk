import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

SimpleSchema.defineValidationErrorTransform(error => {
  console.log(error);
  const newError = new Meteor.Error(400, error.message);
  newError.reason = error.message;
  newError.error = "validation-error";
  newError.details = error.details;
  return newError;
});
