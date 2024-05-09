function classnames(...props) {
  return props.filter((classname) => !!classname).join(' ');
}

export default classnames;
