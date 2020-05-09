import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Clock} from "../../components/online/game/afterGameStart/Clock";
import {ButtonContainer} from "../../helpers/layout";

export const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            background: 'linear-gradient(270deg, #FFFAB6 22.7%, rgba(255, 255, 255, 0) 86.64%), #86E961',
        },
    },
    completed: {
        '& $line': {
            background: 'linear-gradient(270deg, #B9FFB8 22.7%, rgba(255, 255, 255, 0) 86.64%), #86E961',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

export const useColorlibStepIconStyles = makeStyles({
    root: {
        background: 'linear-gradient(220.51deg, #F53E28 0%, rgba(255, 255, 255, 0) 166.52%), #FFF45B',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        background: '#FFFFFF',
        border: '1px solid #EEEEEE',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        background: 'linear-gradient(220.51deg, #4EE142 0%, rgba(255, 255, 255, 0) 166.52%), #FFF45B',
    },
});

export function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <SettingsIcon />,
        2: <GroupAddIcon />,
        3: <VideoLabelIcon />,
    };
    switch (props.icon) {
        case 1: {
            if (props.active) {
                icons["1"] = (<Clock type={"period"} remainingTime={13000} totalTime={13000}/>)
            }
        }
        case 2: {
            if (props.active) {
                icons["2"] = (<Clock type={"period"} remainingTime={10000} totalTime={10000}/>)
            }
        }
        case 3: {
            if (props.active) {
                icons["3"] = (<Clock type={"period"} remainingTime={12000} totalTime={12000}/>)
            }
        }
    }

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Select campaign settings...';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}

export function CustomizedSteppers() {
    const [activeStep, setActiveStep] = React.useState(1);
    const steps = getSteps();

    return (
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} style={{ backgroundColor: "transparent"}}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
    );
}
