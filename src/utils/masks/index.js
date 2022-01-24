const masks = {
  date: (value) => {
    const document = value.replace(/\D/g, '');
    return document
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1/$2');
  },
  zipCode: (value) => {
    const document = value.replace(/\D/g, '');
    return document
      .replace(/^(\d{2})(\d)/g, '$1.$2')
      .replace(/(\d)(\d{3})$/, '$1-$2');
  },
  phone: (value) => {
    const document = value.replace(/\D/g, '');
    return document
      .replace(/^(\d{2})(\d{1})(\d)/g, '($1) $2$3')
      .replace(/(\d)(\d{4})$/, '$1-$2');
  },
};

export default masks;
