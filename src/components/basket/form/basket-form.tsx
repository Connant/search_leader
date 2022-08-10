import { Form, Input, Button } from "semantic-ui-react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

import "./form.scss";

export type IFormValues = {
  userNrame: string;
  telephone: string;
  email: string;
};

const SERVICE_ID = "service_79kne7g";
const TEMPLATE_ID = "template_97fnbul";
const USER_ID = "S2KvwjTFxtFl4nycD";

export default function BasketForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [mail, setMail] = useState("");

  const randomnumber = Math.floor(Math.random() * 999999 + 100000);

  const inputEmail = document.getElementById("form-input-control-email");
  const inputName = document.getElementById("form-input-control-name");

  const inputPhone = document.getElementById(
    "form-input-control-number"
  ) as HTMLInputElement;

  useEffect(() => {
    setName(name);
    setNumber(number);
    setMail(mail);

    const validateEmail = (m: any) => {
      const re = /^[\w-\.]+@[\w-]+\.[a-z]{1,4}$/i;
      if (!re.test(String(m))) {
        inputEmail?.classList.add("error");
      }
      if (re.test(String(m))) {
        inputEmail?.classList.remove("error");
        inputEmail?.classList.add("success");
        return re.test(String(m));
      }
      return re.test(String(m));
    };

    const validName = (name: any) => {
      if (name.length < 2) {
        inputName?.classList.add("error");
      } else {
        inputName?.classList.remove("error");
        inputName?.classList.add("success");
      }
    };

    const validPhone = () => {
      if (inputPhone?.value === "+7 (___) ___-__-__" || number.length === 0) {
        inputPhone?.classList.add("error");
      } else {
        inputPhone?.classList.remove("error");
        inputPhone?.classList.add("success");
      }
    };

    validPhone();
    validName(name);
    validateEmail(mail);
  }, [name, number, mail]);

  const validateName = () => {
    if (inputName?.classList.contains("error") && name.length < 2) {
      return "value-error";
    } else {
      return "value-ok";
    }
  };

  const validateMail = (m: any) => {
    if (inputEmail?.classList.contains("error")) {
      return "value-error";
    } else {
      return "value-ok";
    }
  };

  const validatePhone = () => {
    if (inputPhone?.classList.contains("error")) {
      return "value-error";
    } else {
      return "value-ok";
    }
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const inputEl = document.querySelector(".basket__form--input");
    inputEl?.classList.add("req");

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
      (result) => {
        Swal.fire({
          title: `Спасибо <b>${name}</b>, ваш заказ <b>№${e.target[0].value}</b> оформлен.`,
          html: `<p>В ближайшее время мы свяжемся с вами по телефону <b>${number}</b> для его подтверждения.</p>`,
        }).then(function() {
          window.location.href = "/";
      });
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
      }
    );
    const rs = (document.getElementById('form') as HTMLFormElement);
    rs.reset()
  };

  return (
    <div className="basket__form-wrapper">
      <h3 className="basket__form--title">Пожалуйста, представьтесь</h3>
      <Form
        className="basket__form"
        name="form"
        id="form"
        type="submit"
        onSubmit={handleOnSubmit}
      >
        <Form.Field
          id="form-input-control-randomnumber"
          control={Input}
          value={randomnumber}
          name="randomnumber"
          className="visually-hidden"
        />
        <Form.Field
          id="form-input-control-name"
          control={Input}
          name="user_name"
          placeholder="Ваше имя"
          className="basket__form--input"
          type="text"
        >
          <input
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className={validateName()}>Поле заполнено неверно</span>
        </Form.Field>
        <Form.Field
          control={Input}
          id="form-input-control-number"
          name="user_number"
        >
          <InputMask
            mask="+7 (999) 999-99-99"
            placeholder="Телефoн"
            id="form-input-control-number"
            name="user_number"
            required
            className="basket__form--input-custom"
            defaultValue={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <span className={validatePhone()}>Поле заполнено неверно</span>
        </Form.Field>
        <Form.Field
          id="form-input-control-email"
          control={Input}
          name="user_email"
          placeholder="Email"
          className="basket__form--input"
        >
          <input
            defaultValue={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <span className={validateMail(mail)}>Поле заполнено неверно</span>
        </Form.Field>
        <Button
          className="basket__form--button"
          type="submit"
          primary
          disabled={
            inputName?.classList.contains("error") ||
            inputEmail?.classList.contains("error") ||
            inputPhone?.classList.contains("error") ||
            mail.length === 0 ||
            name.length === 0 ||
            number.length === 0
          }
        >
          Оформить заказ
        </Button>
      </Form>
    </div>
  );
}
