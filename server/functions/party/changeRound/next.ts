import changeCurrentRound from './_changeCurrentRound'

export default async function(event) {
  return changeCurrentRound(event, true);
}
