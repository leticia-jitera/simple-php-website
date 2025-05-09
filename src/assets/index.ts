enum IMAGE_NAMES {
  placeholder = 'placeholder',
}

export function images(image: `${IMAGE_NAMES}`) {
  switch (image) {
    case 'placeholder':
    default:
      return require('./images/placeholder.jpeg');
  }
}
