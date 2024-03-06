import ReactCodeInput from 'react-code-input';

function CodeInput() {
  return (
    <ReactCodeInput
      id="connect__code"
      name="connect__code"
      type="text"
      fields={5}
      inputStyle={{
        width: '46px',
        height: '60px',
        marginLeft: '5px',
        marginRight: '5px',
        borderRadius: '0.6rem',
        border: '1px solid #4C1D95',
        textAlign: 'center',
        fontSize: '40px',
        color: '#4C1D95',
        fontWeight: '600',
        textTransform: 'uppercase'
      }}
    />
  );
}

export default CodeInput;
