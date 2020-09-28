const format = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format

interface IFormattedDateProps {
  value: number | Date | undefined
}

const FormattedDate: React.FC<IFormattedDateProps> = ({ value }) => (
  <>{format(value)}</>
)

export default FormattedDate
