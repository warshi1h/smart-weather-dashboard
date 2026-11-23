// Local, static weather dataset.
// The app works fully offline — no API calls are made anywhere in the project.
// This array is the single source of truth for the "automatic update" and
// "search" features.

const weatherData = [
  { city: 'Delhi', temperature: 38, condition: 'Sunny', humidity: 28, windSpeed: 12 },
  { city: 'Mumbai', temperature: 31, condition: 'Cloudy', humidity: 74, windSpeed: 18 },
  { city: 'Hyderabad', temperature: 29, condition: 'Cloudy', humidity: 55, windSpeed: 10 },
  { city: 'Bengaluru', temperature: 24, condition: 'Rainy', humidity: 68, windSpeed: 14 },
  { city: 'Chennai', temperature: 34, condition: 'Sunny', humidity: 62, windSpeed: 16 },
  { city: 'Kolkata', temperature: 33, condition: 'Stormy', humidity: 79, windSpeed: 27 },
  { city: 'Pune', temperature: 27, condition: 'Cloudy', humidity: 48, windSpeed: 11 },
  { city: 'Jaipur', temperature: 41, condition: 'Sunny', humidity: 20, windSpeed: 9 },
  { city: 'London', temperature: 16, condition: 'Rainy', humidity: 81, windSpeed: 22 },
  { city: 'New York', temperature: 22, condition: 'Cloudy', humidity: 54, windSpeed: 19 },
  { city: 'Tokyo', temperature: 26, condition: 'Sunny', humidity: 58, windSpeed: 13 },
]

export default weatherData
