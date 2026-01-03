import { ZodError } from "zod";


export const formatError = (error: ZodError) => {
let errors: Record<string, string> = {};
error.issues.map((issues:any) => {
  errors[issues.path.join(".")] = issues.message;
});
return errors;
}
