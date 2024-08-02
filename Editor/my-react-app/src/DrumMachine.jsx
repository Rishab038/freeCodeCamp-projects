import React, { useState, useEffect } from 'react';


const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },{
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}
  // ... (other bankOne entries)
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  }, {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
}, {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
}, {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
}, {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
}, {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
}, {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
}, {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
}, {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
}
  // ... (other bankTwo entries)
];

const activeStyle = {
  backgroundColor: "orange",
  boxShadow: "0 3px orange",
  height: 77,
  marginTop: 13
};

const inactiveStyle = {
  backgroundColor: "grey",
  marginTop: 10,
  boxShadow: "3px 3px 5px black"
};

const DrumPad = ({ clip, clipId, keyTrigger, keyCode, power, updateDisplay }) => {
  const [padStyle, setPadStyle] = useState(inactiveStyle);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === keyCode) {
      playSound();
    }
  };

  const activatePad = () => {
    if (power) {
      setPadStyle(padStyle.backgroundColor === "orange" ? inactiveStyle : activeStyle);
    } else {
      setPadStyle(padStyle.marginTop === 13 ? inactiveStyle : {
        height: 77,
        marginTop: 13,
        backgroundColor: "grey",
        boxShadow: "0 3px grey"
      });
    }
  };

  const playSound = () => {
    const sound = document.getElementById(keyTrigger);
    sound.currentTime = 0;
    sound.play();
    activatePad();
    setTimeout(() => activatePad(), 100);
    updateDisplay(clipId.replace(/-/g, " "));
  };

  return (
    <div className="drum-pad" id={clipId} onClick={playSound} style={padStyle}>
      <audio className="clip" id={keyTrigger} src={clip} />
      {keyTrigger}
    </div>
  );
};

const PadBank = ({ power, currentPadBank, updateDisplay }) => {
  const padBank = currentPadBank.map((drumObj) => (
    <DrumPad
      clip={power ? drumObj.url : "#"}
      clipId={drumObj.id}
      key={drumObj.id}
      keyCode={drumObj.keyCode}
      keyTrigger={drumObj.keyTrigger}
      power={power}
      updateDisplay={updateDisplay}
    />
  ));

  return <div className="pad-bank">{padBank}</div>;
};

const DrumMachine = () => {
  const [power, setPower] = useState(true);
  const [display, setDisplay] = useState(String.fromCharCode(160));
  const [currentPadBank, setCurrentPadBank] = useState(bankOne);
  const [currentPadBankId, setCurrentPadBankId] = useState("Heater Kit");
  const [sliderVal, setSliderVal] = useState(0.3);

  const powerControl = () => {
    setPower(!power);
    setDisplay(String.fromCharCode(160));
  };

  const selectBank = () => {
    if (power) {
      if (currentPadBankId === "Heater Kit") {
        setCurrentPadBank(bankTwo);
        setDisplay("Smooth Piano Kit");
        setCurrentPadBankId("Smooth Piano Kit");
      } else {
        setCurrentPadBank(bankOne);
        setDisplay("Heater Kit");
        setCurrentPadBankId("Heater Kit");
      }
    }
  };

  const displayClipName = (name) => {
    if (power) {
      setDisplay(name);
    }
  };

  const adjustVolume = (e) => {
    if (power) {
      setSliderVal(e.target.value);
      setDisplay(`Volume: ${Math.round(e.target.value * 100)}`);
      setTimeout(() => clearDisplay(), 1000);
    }
  };

  const clearDisplay = () => {
    setDisplay(String.fromCharCode(160));
  };

  const powerSlider = power ? { float: "right" } : { float: "left" };
  const bankSlider = currentPadBank === bankOne ? { float: "left" } : { float: "right" };

  useEffect(() => {
    const clips = document.getElementsByClassName("clip");
    Array.from(clips).forEach(sound => {
      sound.volume = sliderVal;
    });
  }, [sliderVal]);

  return (
    <div className="inner-container" id="drum-machine">
      <PadBank
        clipVolume={sliderVal}
        currentPadBank={currentPadBank}
        power={power}
        updateDisplay={displayClipName}
      />

      <div className="logo">
        <div className="inner-logo ">FCC{String.fromCharCode(160)}</div>
        <i className="inner-logo fa fa-free-code-camp" />
      </div>

      <div className="controls-container">
        <div className="control">
          <p>Power</p>
          <div className="select" onClick={powerControl}>
            <div className="inner" style={powerSlider} />
          </div>
        </div>
        <p id="display">{display}</p>
        <div className="volume-slider">
          <input
            max="1"
            min="0"
            onChange={adjustVolume}
            step="0.01"
            type="range"
            value={sliderVal}
          />
        </div>
        <div className="control">
          <p>Bank</p>
          <div className="select" onClick={selectBank}>
            <div className="inner" style={bankSlider} />
          </div>
        </div>
      </div>
    </div>
  );
};


export default DrumMachine;