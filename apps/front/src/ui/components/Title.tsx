import "./Title.css";
import { Link, useNavigate } from "react-router-dom";

export type TitleProps = {
  returnOption: boolean;
  title: string;
  redirectLink: string;
};

const Title = ({ title, returnOption, redirectLink }: TitleProps) => {
  const navigate = useNavigate();

  return (
    <div className="title">
      <h1>{title}</h1>

      {returnOption ? (
        <input type="button" value="Voltar" onClick={() => navigate(-1)} />
      ) : (
        <Link to={redirectLink}>
          <input type="button" value="Adicionar" />
        </Link>
      )}
    </div>
  );
};

export default Title;
