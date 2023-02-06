import logo from "../../images/logo.svg";
//Соре, локально почему-то файл переименовался, но при пуше на гитхабе он с маленькой буквы остался почему-то
//И спасибо за объяснение про сброс эффекта. Плюс в карму и в отзыве обеспечен =)
/**
 * Компонент хедера
 */
export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место" className="logo" />
    </header>
  );
}
