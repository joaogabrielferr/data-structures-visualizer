import { useNavigate } from "react-router-dom";

export default function ApresentacaoDS({ title, desc,color,img,fontColor,buttonClass,done,link }) {

    const navigate = useNavigate();

    return (
    <div className="ApresentacaoDS" style = {{backgroundColor : color, color: fontColor}}>
      <div className="data-structure">
        <div className="info-data-structure">
          <div className="inner-info">
            <h1>{title}</h1>
            <p>{desc}</p>
            { done === true ? <button className = {buttonClass} onClick = {()=>navigate(link)} >Visualize it</button>:""}
          </div>
        </div>
        <div className="img-data-structure">
            <div className="inner-img">
                {done ? <img src={img} alt="" /> : <h1>IN DEVELOPMENT</h1>}
            </div>
        </div>
      </div>
    </div>
  );
}
