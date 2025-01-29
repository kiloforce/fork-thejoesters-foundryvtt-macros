/*
src: https://gist.github.com/thejoester/5aca2681427110420b0c8142ae8e1852
******************************************************************
	Macro Title: Change Wall Type
	Author: TheJoester (https://github.com/thejoester)
	Description:
	This macro opens a dialog that lets you quickly change
 	wall type of selected walls. 
	Foundry Version: 12
	Last updated 25-Jan-2025
	Author: TheJoester (https://github.com/thejoester)
	License: MIT License
******************************************************************
*/
const updateWalls = (updates) => {
  const selectedWalls = canvas.walls.controlled;
  if (selectedWalls.length === 0) {
    return ui.notifications.warn("No walls selected.");
  }

  const changes = selectedWalls.map((wall) => ({
    _id: wall.id,
    ...updates,
  }));
  return canvas.scene.updateEmbeddedDocuments("Wall", changes);
};

// Dialog for Wall Settings
new Dialog({
  title: "Wall Settings",
  content: `
    <h3>Wall</h3>
    <div style="display: flex; gap: 5px;">
      <button id="wall-macro-normal">Normal</button>
      <button id="wall-macro-invisible">Invisible</button>
		<button id="wall-macro-ethereal">Ethereal</button>
      <button id="wall-macro-terrain">Terrain</button>
    </div>
	 <br>
    <h3>Wall Direction</h3>
    <div style="display: flex; gap: 5px;">
      <button id="wall-macro-both">Both</button>
      <button id="wall-macro-left">Left</button>
      <button id="wall-macro-right">Right</button>
    </div>
    <br>
    <h3>Doors</h3>
    <div style="display: flex; gap: 5px;">
      <button id="wall-macro-closed-door">Closed</button>
      <button id="wall-macro-open-door">Open</button>
      <button id="wall-macro-locked">Locked</button>
      <button id="wall-macro-secret">Secret</button>
      <button id="wall-macro-window">Window</button>
    </div>
  `,
  buttons: {},
  render: (html) => {
    // Wall types
    html.find("#wall-macro-normal").click(() =>
      updateWalls({
        door: CONST.WALL_DOOR_TYPES.NONE,
        move: CONST.WALL_MOVEMENT_TYPES.NORMAL,
        light: CONST.WALL_RESTRICTION_TYPES.NORMAL,
        sight: CONST.WALL_RESTRICTION_TYPES.NORMAL,
        sound: CONST.WALL_RESTRICTION_TYPES.NORMAL,
        dir: CONST.WALL_DIRECTIONS.BOTH,
        ds: CONST.WALL_DOOR_STATES.CLOSED,
      })
    );

    html.find("#wall-macro-invisible").click(() =>
      updateWalls({
        door: CONST.WALL_DOOR_TYPES.NONE,
        move: CONST.WALL_MOVEMENT_TYPES.NORMAL,
        light: CONST.WALL_SENSE_TYPES.NONE,
        sight: CONST.WALL_SENSE_TYPES.NONE,
        sound: CONST.WALL_SENSE_TYPES.NONE,
        dir: CONST.WALL_DIRECTIONS.BOTH,
        ds: CONST.WALL_DOOR_STATES.CLOSED,
      })
    );

   html.find("#wall-macro-ethereal").click(() =>
      updateWalls({
        door: CONST.WALL_DOOR_TYPES.NONE,
        move: CONST.WALL_MOVEMENT_TYPES.NONE,
        light: CONST.WALL_SENSE_TYPES.NORMAL,
        sight: CONST.WALL_SENSE_TYPES.NORMAL,
        sound: CONST.WALL_SENSE_TYPES.NONE,
        dir: CONST.WALL_DIRECTIONS.BOTH,
        ds: CONST.WALL_DOOR_STATES.CLOSED,
      })
    );

    html.find("#wall-macro-terrain").click(() =>
      updateWalls({
        door: CONST.WALL_DOOR_TYPES.NONE,
        move: CONST.WALL_MOVEMENT_TYPES.NORMAL,
        light: CONST.WALL_SENSE_TYPES.LIMITED,
        sight: CONST.WALL_SENSE_TYPES.LIMITED,
        sound: CONST.WALL_SENSE_TYPES.LIMITED,
        dir: CONST.WALL_DIRECTIONS.BOTH,
        ds: CONST.WALL_DOOR_STATES.CLOSED,
      })
    );

    // Wall directions
    html.find("#wall-macro-left").click(() =>
      updateWalls({ dir: CONST.WALL_DIRECTIONS.LEFT })
    );
    html.find("#wall-macro-right").click(() =>
      updateWalls({ dir: CONST.WALL_DIRECTIONS.RIGHT })
    );
    html.find("#wall-macro-both").click(() =>
      updateWalls({ dir: CONST.WALL_DIRECTIONS.BOTH })
    );

    // Door types
    html.find("#wall-macro-closed-door").click(() =>
      updateWalls({
        door: CONST.WALL_DOOR_TYPES.DOOR,
        ds: CONST.WALL_DOOR_STATES.CLOSED,
        move: CONST.WALL_MOVEMENT_TYPES.NORMAL,
        light: CONST.WALL_SENSE_TYPES.NORMAL,
        sight: CONST.WALL_SENSE_TYPES.NORMAL,
        sound: CONST.WALL_SENSE_TYPES.NORMAL,
      })
    );

	html.find("#wall-macro-open-door").click(() =>
      updateWalls({
        door: CONST.WALL_DOOR_TYPES.DOOR,
        ds: CONST.WALL_DOOR_STATES.OPEN,
        move: CONST.WALL_MOVEMENT_TYPES.NORMAL,
        light: CONST.WALL_SENSE_TYPES.NORMAL,
        sight: CONST.WALL_SENSE_TYPES.NORMAL,
        sound: CONST.WALL_SENSE_TYPES.NORMAL,
      })
    );

    html.find("#wall-macro-locked").click(() =>
      updateWalls({
        door: CONST.WALL_DOOR_TYPES.DOOR,
        ds: CONST.WALL_DOOR_STATES.LOCKED,
        move: CONST.WALL_MOVEMENT_TYPES.NORMAL,
        light: CONST.WALL_SENSE_TYPES.NORMAL,
        sight: CONST.WALL_SENSE_TYPES.NORMAL,
        sound: CONST.WALL_SENSE_TYPES.NORMAL,
      })
    );

    html.find("#wall-macro-secret").click(() =>
      updateWalls({
        door: CONST.WALL_DOOR_TYPES.SECRET,
        ds: CONST.WALL_DOOR_STATES.CLOSED,
        move: CONST.WALL_MOVEMENT_TYPES.NORMAL,
        light: CONST.WALL_SENSE_TYPES.NORMAL,
        sight: CONST.WALL_SENSE_TYPES.NORMAL,
        sound: CONST.WALL_SENSE_TYPES.NORMAL,
      })
    );

    html.find("#wall-macro-window").click(() =>
      updateWalls({
        door: CONST.WALL_DOOR_TYPES.NONE,
        ds: CONST.WALL_DOOR_STATES.CLOSED,
        light: CONST.WALL_SENSE_TYPES.PROXIMITY,
        move: CONST.WALL_MOVEMENT_TYPES.NORMAL,
        sight: CONST.WALL_SENSE_TYPES.PROXIMITY,
        sound: CONST.WALL_SENSE_TYPES.NORMAL,
        threshold: { light: 10, sight: 10, sound: 1, attenuation: true },
      })
    );
  },
}).render(true);
