import { GT } from "@graphql/index"

import IError from "../abstract/error"

const SuccessPayload = new GT.Object({
  name: "SuccessPayload",
  fields: () => ({
    errors: {
      type: GT.NonNullList(IError),
    },
    success: {
      type: GT.Boolean,
    },
  }),
})

export default SuccessPayload
