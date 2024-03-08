import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function SearchBar({ onSearch }) {
  const FeedbackSchema = Yup.object().shape({
    search: Yup.string().min(3, "Too Short!").max(30, "Too Long!"),
  });

  return (
    <header className={css.header}>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values, actions) => {
          if (!values.search) {
            toast.error("Enter text to search for images");
          } else {
            onSearch(values.search);
            actions.resetForm();
          }
        }}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <Field
            className={css.input}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={css.btn}>
            Search
          </button>
          <ErrorMessage name="search" component="div" className={css.error} />
          <Toaster />
        </Form>
      </Formik>
    </header>
  );
}
