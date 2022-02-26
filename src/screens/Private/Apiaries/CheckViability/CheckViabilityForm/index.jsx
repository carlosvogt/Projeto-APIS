import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form, Dropdown } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Footer } from '@components/layout';

function CheckViabilityForm({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const questionTwo = useRef();
  const questionNine = useRef();
  const [selectedQuestionTwo, setSelectedQuestionTwo] = useState(false);
  const [selectedQuestionTree, setSelectedQuestionTree] = useState(false);
  const [selectedQuestionFour, setSelectedQuestionFour] = useState(false);
  const [selectedQuestionFive, setSelectedQuestionFive] = useState(false);
  const [selectedQuestionSix, setSelectedQuestionSix] = useState(false);
  const [selectedQuestionSeven, setSelectedQuestionSeven] = useState(false);
  const [selectedQuestionEight, setSelectedQuestionEight] = useState(false);

  function validPercentage(value) {
    const percent = value.replace(/\D/g, '');
    if (percent > 100) {
      return false;
    }
    return true;
  }

  const schema = Yup.object().shape({
    questionOne: Yup.string()
      .required(t('formErrors:required'))
      .test('validPercent', t('formErrors:percentage'), (value) => {
        if (value) {
          return validPercentage(value);
        }
        return true;
      }),
    questionTwo: Yup.string().required(t('formErrors:required')),
    questionTree: Yup.string().required(t('formErrors:required')),
    questionFour: Yup.string().required(t('formErrors:required')),
    questionFive: Yup.string().required(t('formErrors:required')),
    questionSix: Yup.string().required(t('formErrors:required')),
    questionSeven: Yup.string().required(t('formErrors:required')),
    questionEight: Yup.string().required(t('formErrors:required')),
    questionNine: Yup.string().required(t('formErrors:required')),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const yesNotOptions = [
    {
      label: t('checkViability:yes'),
      value: t('checkViability:yes'),
    },
    {
      label: t('checkViability:not'),
      value: t('checkViability:not'),
    },
  ];
  const vegetation = [
    {
      label: t('checkViability:trip'),
      value: t('checkViability:trip'),
    },
    {
      label: t('checkViability:woods'),
      value: t('checkViability:woods'),
    },
  ];
  const distancy = [
    {
      label: t('checkViability:more400'),
      value: t('checkViability:more400'),
    },
    {
      label: t('checkViability:less400'),
      value: t('checkViability:less400'),
    },
  ];

  const handleSetOptionTwo = (value) => {
    setSelectedQuestionTwo(value);
    setValue('questionTwo', value, {
      shouldValidate: true,
    });
  };

  const handleSetOptionTree = (value) => {
    setSelectedQuestionTree(value);
    setValue('questionTree', value, {
      shouldValidate: true,
    });
  };

  const handleSetOptionFour = (value) => {
    setSelectedQuestionFour(value);
    setValue('questionFour', value, {
      shouldValidate: true,
    });
  };
  const handleSetOptionFive = (value) => {
    setSelectedQuestionFive(value);
    setValue('questionFive', value, {
      shouldValidate: true,
    });
  };
  const handleSetOptionSix = (value) => {
    setSelectedQuestionSix(value);
    setValue('questionSix', value, {
      shouldValidate: true,
    });
  };
  const handleSetOptionSeven = (value) => {
    setSelectedQuestionSeven(value);
    setValue('questionSeven', value, {
      shouldValidate: true,
    });
  };
  const handleSetOptionEight = (value) => {
    setSelectedQuestionEight(value);
    setValue('questionEight', value, {
      shouldValidate: true,
    });
  };

  return (
    <>
      <Form.TextInput
        name="questionOne"
        label={t('checkViability:questionOne')}
        errorMessage={errors.questionOne?.message}
        control={control}
        returnKeyType="next"
        keyboardType="numeric"
        onSubmitEditing={() => questionTwo.current.focus()}
      />
      <Dropdown
        name="questionTwo"
        label={t('checkViability:questionTwo')}
        value={selectedQuestionTwo}
        setValue={(value) => handleSetOptionTwo(value)}
        data={yesNotOptions}
        error={errors.questionTwo?.message}
        control={control}
        mode="bottom"
      />
      <Dropdown
        name="questionTree"
        label={t('checkViability:questionTree')}
        value={selectedQuestionTree}
        setValue={(value) => handleSetOptionTree(value)}
        data={yesNotOptions}
        error={errors.questionTree?.message}
        control={control}
        mode="bottom"
      />
      <Dropdown
        name="questionFour"
        label={t('checkViability:questionFour')}
        value={selectedQuestionFour}
        setValue={(value) => handleSetOptionFour(value)}
        data={vegetation}
        error={errors.questionFour?.message}
        control={control}
        mode="bottom"
      />
      <Dropdown
        name="questionFive"
        label={t('checkViability:questionFive')}
        value={selectedQuestionFive}
        setValue={(value) => handleSetOptionFive(value)}
        data={distancy}
        error={errors.questionFive?.message}
        control={control}
        mode="bottom"
      />
      <Dropdown
        name="questionSix"
        label={t('checkViability:questionSix')}
        value={selectedQuestionSix}
        setValue={(value) => handleSetOptionSix(value)}
        data={yesNotOptions}
        error={errors.questionSix?.message}
        control={control}
        mode="bottom"
      />
      <Dropdown
        name="questionSeven"
        label={t('checkViability:questionSeven')}
        value={selectedQuestionSeven}
        setValue={(value) => handleSetOptionSeven(value)}
        data={yesNotOptions}
        error={errors.questionSeven?.message}
        control={control}
        mode="bottom"
      />
      <Dropdown
        name="questionEight"
        label={t('checkViability:questionEight')}
        value={selectedQuestionEight}
        setValue={(value) => handleSetOptionEight(value)}
        data={yesNotOptions}
        error={errors.questionEight?.message}
        control={control}
        mode="bottom"
      />
      <Form.TextInput
        inputRef={questionNine}
        name="questionNine"
        keyboardType="numeric"
        returnKeyType="done"
        label={t('checkViability:questionNine')}
        errorMessage={errors.questionNine?.message}
        control={control}
      />
      <Footer>
        <Button
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          title={
            isSubmitting
              ? t('checkViability:checking')
              : t('checkViability:check')
          }
        />
      </Footer>
    </>
  );
}

CheckViabilityForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

CheckViabilityForm.defaultProps = {
  isSubmitting: false,
};

export default CheckViabilityForm;
