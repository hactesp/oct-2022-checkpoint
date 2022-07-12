import {useForm, useFormContext, FormProvider} from "react-hook-form";
import {Box, Button, CircularProgress} from "@mui/material";
import './profile.scss';
import {ProfileConfiguration} from "./index";
import React, {useEffect, useState} from "react";
import {profileService} from "./profile.service";
import {useNavigate} from "react-router-dom";
import { camelCaseTextToTitle } from "../../commons/ultilities/StringUltilities";


export function Profile() {
  const formContext = useForm();
  const navigate = useNavigate();
  const [profileConfig, setProfileConfig] = useState<{ profileConfigs: ProfileConfiguration[], isFetchingData: boolean }>({
    profileConfigs: [],
    isFetchingData: true
  });
  const onSubmit = (data: any) => console.log(data);
  const backToHome = (data: any) => navigate("/");

  useEffect(() => {
    const getProfileConfiguration = async () => {
      try {
        setProfileConfig({profileConfigs: profileConfig.profileConfigs, isFetchingData: true});
        const response = await profileService.getProfileConfiguration();
        setProfileConfig({profileConfigs: response, isFetchingData: false});
      } catch (e) {
        setProfileConfig({profileConfigs: profileConfig.profileConfigs, isFetchingData: false});
      }
    };
    getProfileConfiguration();
  }, []);

  return (
    <div className="profile-section">
      <FormProvider {...formContext} >
        <form onSubmit={formContext.handleSubmit(onSubmit)} autoComplete="off"
              style={{minWidth: "300px", fontFamily: "Arial, Helvetica, sans-serif"}}>
          {!profileConfig.isFetchingData && profileConfig.profileConfigs.map((field) => {
              return <FieldControl key={field.name} field={field}/>
            }
          )}
          {profileConfig.isFetchingData &&
            <Box sx={{display: 'flex'}}>
              <CircularProgress/>
            </Box>
          }
          <div className="action-section">
            <Button
              color="primary"
              type="submit"
              variant="contained"
              onClick={formContext.handleSubmit(onSubmit)}
            >
              Add
            </Button>
            <Button color="secondary" variant="contained" type="button" onClick={backToHome}>
              Back To Home
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default Profile;

function FieldControl({field}: { field: ProfileConfiguration }) {
  const {register, formState: {errors}} = useFormContext();
  return (
    <div>
      <label>{camelCaseTextToTitle(field.name)}</label>
      {(field.type === "text" || field.type === "number") &&
        <input type={field.type}
               placeholder={camelCaseTextToTitle(field.name)} {...register(field.name, field.validateConditions)}
               className={errors[field.name] ? "invalid" : "normal"}/>
      }

      {field.type === "dropdown" &&
        <select {...register(field.name, field.validateConditions)} defaultValue="">
          <option value=""></option>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
      }
      {field.type === "date" &&
        <input type={field.type}
               placeholder={camelCaseTextToTitle(field.name)} {...register(field.name, field.validateConditions)}
               className={errors[field.name] ? "invalid" : "normal"}/>
      }
      {errors[field.name] && <p>This field is invalid</p>}
    </div>
  );
}

