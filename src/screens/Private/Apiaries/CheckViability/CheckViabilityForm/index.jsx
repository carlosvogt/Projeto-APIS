import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form, Dropdown } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Footer } from '@components/layout';

function CheckViabilityForm({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const [selectedQuestionOne, setSelectedQuestionOne] = useState(false);
  const [selectedQuestionTwo, setSelectedQuestionTwo] = useState(false);
  const [selectedQuestionTree, setSelectedQuestionTree] = useState(false);
  const [selectedQuestionFour, setSelectedQuestionFour] = useState(false);
  const [selectedQuestionFive, setSelectedQuestionFive] = useState(false);
  const [selectedQuestionSix, setSelectedQuestionSix] = useState(false);
  const [selectedQuestionSeven, setSelectedQuestionSeven] = useState(false);
  const [selectedQuestionEight, setSelectedQuestionEight] = useState(false);

  const schema = Yup.object().shape({
    questionOne: Yup.string().required(t('formErrors:required')),
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
      label: t('checkViability:less300'),
      value: t('checkViability:less300'),
    },
    {
      label: t('checkViability:between300and400'),
      value: t('checkViability:between300and400'),
    },
    {
      label: t('checkViability:more400'),
      value: t('checkViability:more400'),
    },
  ];

  const floraOptions = [
    {
      label: t('checkViability:<=10'),
      value: t('checkViability:<=10'),
    },
    {
      label: t('checkViability:>10>=20'),
      value: t('checkViability:>10>=20'),
    },
    {
      label: t('checkViability:>20>=30'),
      value: t('checkViability:>20>=30'),
    },
    {
      label: t('checkViability:>30>=40'),
      value: t('checkViability:>30>=40'),
    },
    {
      label: t('checkViability:>40'),
      value: t('checkViability:>40'),
    },
  ];

  const handleSetOptionOne = (value) => {
    setSelectedQuestionOne(value);
    setValue('questionOne', value, {
      shouldValidate: true,
    });
  };

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
      <Dropdown
        name="questionOne"
        label={t('checkViability:questionOne')}
        value={selectedQuestionOne}
        setValue={(value) => handleSetOptionOne(value)}
        data={floraOptions}
        error={errors.questionOne?.message}
        control={control}
        mode="bottom"
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
