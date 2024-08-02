import React, { useState, useEffect } from 'react';

function SoundBox() {

    const bankOne = [
        {
          keyCode: 81,
          keyTrigger: "Q",
          id: "Heater-1",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
        },
        // ... (other bankOne entries)
      ];
      
      const bankTwo = [
        {
          keyCode: 81,
          keyTrigger: "Q",
          id: "Chord-1",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
        },
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
            <div className="pad-bank">
                <button className="drum-pad" id="Heater-1">Q</button>
                <button className="drum-pad" id="Heater-2">W</button>
                <button className="drum-pad" id="Heater-3">E</button>
                <button className="drum-pad" id="Heater-4">A</button>
                <button className="drum-pad" id="Clap">S</button>
                <button className="drum-pad" id="Open-HH">D</button>
                <button className="drum-pad" id="Kick-n'-Hat">Z</button>
                <button className="drum-pad" id="Kick">X</button>
                <button className="drum-pad" id="Closed-HH">C</button>
            </div>
            <div className="logo">
                <div className="inner-logo">FCC&nbsp</div>
                <i className="fa-free-code-camp"></i>
            </div>
            <div className="controls-container">
                <div className="control">
                <p>Power</p>
                <div className="select">
                    <div className="inner"></div>
                </div>
                </div>
                <p id="display">Heater 1</p>

                <div className="volume-slider">
                <input type="range" min="1" max="100" value="50" class="slider" id="myRange"></input>
                <p>Value: <span id="demo"></span></p>
                </div>

                <div className="control">
                    <p>Bank</p>
                    <div className="select">
                    <div className="inner"></div>
                    </div>
                </div>
            </div>
        </div>
    );
          }
        }

export default SoundBox