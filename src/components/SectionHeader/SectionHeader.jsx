import './SectionHeader.scss';

function SectionHeader({ text, id }) {
  return (
    <h2 className="section__header" id={id}>{ text }</h2>
  );
}

export default SectionHeader;
