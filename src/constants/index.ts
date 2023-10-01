const width = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
  isSmallDevice: '768px',
};

const height = {
  small: '400px',
  mid: '800px',
};

export const device = {
  mobileS: `(max-width: ${width.mobileS})`,
  mobileM: `(max-width: ${width.mobileM})`,
  mobileL: `(max-width: ${width.mobileL})`,
  tablet: `(max-width: ${width.tablet})`,
  laptop: `(max-width: ${width.laptop})`,
  laptopL: `(max-width: ${width.laptopL})`,
  desktop: `(max-width: ${width.desktop})`,
  desktopL: `(max-width: ${width.desktop})`,
  isSmallDevice: `(max-width: ${width.isSmallDevice})`,
};

export const deviceHeight = {
  small: `(max-height: ${height.small})`,
  mid: `(max-height: ${height.mid})`,
};

export const logout = () => {
  localStorage.clear();
  window.location.reload();
};

export const questionTypes = [
  'Paragraph', 'Short Answer', 'Yes/No', 'Dropdown', 'Multiple Choice', 
  'Date', 'Number', 'File Upload', 'Video'
]
