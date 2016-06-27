function getThumbnailImageSource(movie) {
  let uri = movie && movie.posters ? movie.posters.thumbnail : null;
  return { uri };
}

function getDetailedImageSource(movie) {
  let uri = movie && movie.posters ? movie.posters.detailed : null;
  return { uri };
}

function getStyleFromScore(score) {
  const maxValue = 200;
  let color = '#999999';

  if (score >= 0) {
    var normalizedScore = Math.round((score / 100) * maxValue);
    color = `rgb(${maxValue - normalizedScore}, ${normalizedScore}, 0)`;
  }

  return {
    color
  };
}

function getTextFromScore(score) {
  return score > 0 ? score + '%' : 'N/A';
}

export default {
  getThumbnailImageSource,
  getDetailedImageSource,
  getStyleFromScore,
  getTextFromScore
}
