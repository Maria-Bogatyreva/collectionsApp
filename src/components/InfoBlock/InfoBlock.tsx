import './info-block.scss'

interface InfoBlockProps {
  imageSrc: string;
  text: string;
}
export default function InfoBlock({imageSrc, text} : InfoBlockProps) {
  return (
    <div className="info-block">
      <img src={imageSrc} alt=""/>
      <p>{text}</p>
    </div>
  )
}
