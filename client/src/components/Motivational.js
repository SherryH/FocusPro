import React from 'react';
import { Modal } from 'react-materialize';

export default class Motivational extends React.Component {
  render() {
    return (
      <Modal
        fixedFooter
        trigger={<a href="#/new"><i className="material-icons small return">lightbulb_outline</i></a>}
      >
        <h2>What is your Overarching Goal?</h2>
        <br />
        <h5>It is best to optimize by picking ONE goal. Stay focused on that one before moving onto the next one.</h5>
        <br />
         Examples:
        <br />
        <ul>
          <p>Why are you doing what you are doing? What do you hope to accomplish?</p>
          <p>What would your ideal 60th birthday look like?</p>
          <p>What would be the biggest regret you could have at the end of your life?</p>
          <p>18 months from now, what achievement would have the biggest positive impact on your life?</p>
          <p>Have you ever had the feeling that a discipline or field was tailor-made for you personally?</p>
          <p>What completely consumes your attention once you start doing it?</p>
          <p>What makes your heart race with excitement?</p>
          <p>Do you believe that some things are worth doing, even though others, perhaps, would not agree?</p>
        </ul>
        <br />
        <h5>On Subgoals: by taking small, measurable steps regularly, we will be on track to the end.
        </h5>
        <br />
        <p>It is best to have a max of 3 subgoals going on at once</p>
        <p>Formulate the ONE goal into a number</p>
        <p>Make it very descriptive. Be specific. Force yourself to think about it.</p>
        <br />
        <hr />
        <br />
        <div className="row">
          <form className="col s11">
            <div className="row">
              <div className="input-field col s12">
                <textarea id="textarea1" className="materialize-textarea" />
                <label htmlFor="textarea1">Type here to brainstorm goals. This will not be saved.</label>
              </div>
            </div>
            (Questions from http://niklasgoeke.com/how-to-set-goals)
          </form>
        </div>
      </Modal>
    );
  }
}
