import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { Accounts } from "meteor/accounts-base";

Accounts.validateNewUser(user => {
  console.log(user);
  const email = user.emails[0].address;

  const emailSchema = new SimpleSchema({
    email: { type: String, regEx: SimpleSchema.RegEx.Email }
  });
  //   try {
  emailSchema.validate({ email });
  //   } catch (e) {
  //     throw new Meteor.Error(400, e.message);
  //   }
  return true;
});
