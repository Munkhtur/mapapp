import React, { useRef, useState } from 'react'
import {
  Engine,
  Scene,
  useBeforeRender,
} from 'react-babylonjs'

import { Vector3, Color3, Texture } from '@babylonjs/core'

const DefaultScale = new Vector3(1, 1, 1)
const BiggerScale = new Vector3(7.25, 7.25, 7.25)

const SpinningBox = (props) => {
    const boxRef = useRef(null)



    const rpm = 5
    useBeforeRender((scene) => {
      if (boxRef.current) {
        var deltaTimeInMillis = scene.getEngine().getDeltaTime()
        boxRef.current.rotation.y +=
          (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
      }
    })

    return (
        <box
          name={props.name}
          ref={boxRef}
          size={2}
          position={props.position}
          scaling={BiggerScale}
        >
          <standardMaterial
            name={`${props.name}-mat`}
            specularColor={Color3.Black()}
            diffuseTexture={props.texture}
            
          />
        </box>
      )
    }

    export const SceneWithSpinningBoxes = ({imageLink}) => {
        console.log(imageLink)
      return  <div>
          <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
            <Scene>
              <arcRotateCamera
                name="camera1"
                target={Vector3.Zero()}
                alpha={Math.PI / 2}
                beta={Math.PI / 4}
                radius={8}
              />
              <hemisphericLight
                name="light1"
                intensity={0.7}
                direction={Vector3.Up()}
              />
              <SpinningBox
                name="left"
                position={new Vector3(-2, 0, 0)}
                color={Color3.FromHexString('#eb4034')}
                hoveredColor={Color3.FromHexString('#C26DBC')}
                texture = { new Texture(String(imageLink))}
              />        

            </Scene>
          </Engine>
        </div>
    }