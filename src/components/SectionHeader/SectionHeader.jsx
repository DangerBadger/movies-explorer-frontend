import './SectionHeader.scss';

function SectionHeader({ text, id }) {
  return (
    <h2 className="section-header" id={id}>{ text }</h2>
  );
}

export default SectionHeader;
