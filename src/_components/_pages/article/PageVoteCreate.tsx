import React, { useState, useEffect } from "react";

import styled from "@emotion/styled";

import { useApi } from "../../../api";

import { ScreenHelmet, useNavigator } from "@karrotframe/navigator";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

const PageVoteCreate: React.FC = () => {
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: {
      mainText: "",
      items: [{ mainText: "" }, { mainText: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const api = useApi();
  const { pop } = useNavigator();

  const onSubmit = (data: any) => {
    const response = api.voteController.writeNewVoteUsingPOST({
      voteContent: {
        mainText: data.mainText,
        items: data.items.filter((item: any) => item.mainText.length > 0),
      },
    });
    response.then((res) => {
      if (res.status === "SUCCESS") {
        pop();
      }
    });
  };

  const [validSubmit, setValidSubmit] = useState(false);

  useEffect(() => {
    let validOptions = 0;
    for (let item of watch(`items`)) {
      console.log(item.mainText.length);
      if (item.mainText.length > 0) {
        validOptions++;
      }
    }
    setValidSubmit(
      Boolean(validOptions >= 2) && Boolean(watch("mainText").length)
    );
  }, [watch()]);

  return (
    <div className="page">
      <ScreenHelmet
        appendRight={
          <button
            type="submit"
            form="VoteSubmitForm"
            className="VoteSubmitForm-btn"
            style={{
              color: validSubmit ? "#E95454" : "#CCCCCC",
            }}
          >
            완료
          </button>
        }
      />
      <form id="VoteSubmitForm" onSubmit={handleSubmit(onSubmit)}>
        <MainTextContainer>
          <MainTextWrapper>
            <MainTextTextarea
              id="VoteSubmitForm-textarea"
              placeholder="투표 제목을 입력하세요."
              value={watch("mainText").substring(0, 40)}
              {...register("mainText")}
            />
            <MainTextCounter>
              ({watch("mainText").length <= 40 ? watch("mainText").length : 40}
              /40)
            </MainTextCounter>
          </MainTextWrapper>
        </MainTextContainer>
        <OptionsList>
          {fields.map((item, index) => {
            return (
              <Option key={item.id} className="VoteSubmitForm-option">
                <DeleteButton
                  type="button"
                  className="VoteSubmitForm-option--icon"
                  style={{
                    color: watch(`items`).length > 2 ? "#555555" : "#cccccc",
                    borderColor:
                      watch(`items`).length > 2 ? "#555555" : "#cccccc",
                  }}
                  onClick={() => remove(index)}
                  disabled={Boolean(watch(`items`).length < 3)}
                >
                  -
                </DeleteButton>
                {watch(`items.${index}.mainText`).length === 0 && (
                  <label
                    htmlFor={`items${index}`}
                    className="VoteSubmitForm-option--placeholder"
                  >
                    <OptionInputPlaceholderText className="VoteSubmitForm-option--placeholderText">
                      항목 입력
                    </OptionInputPlaceholderText>
                    <OptionInputPlaceholderCounter className="VoteSubmitForm-option--placeholderCounter">{`(${
                      index + 1
                    }/5)`}</OptionInputPlaceholderCounter>
                  </label>
                )}
                <OptionInput
                  id={`items${index}`}
                  className="VoteSubmitForm-option--inputbox"
                  value={watch(`items.${index}.mainText`).substring(0, 16)}
                  {...register(`items.${index}.mainText`)}
                />
              </Option>
            );
          })}
          {fields.length < 5 && (
            <AppendField
              className="VoteSubmitForm-option"
              onClick={() => {
                append({ mainText: "" });
              }}
            >
              <AppendIcon className="VoteSubmitForm-option--icon">+</AppendIcon>
              <AppendInput className="VoteSubmitForm-option--inputbox">
                <AppendInputPlaceholderText className="VoteSubmitForm-option--placeholder VoteSubmitForm-option--placeholderText">
                  항목 추가
                </AppendInputPlaceholderText>
              </AppendInput>
            </AppendField>
          )}
        </OptionsList>
      </form>
    </div>
  );
};

export default PageVoteCreate;

const MainTextContainer = styled.div`
  width: 100%;
  height: 128px;

  padding: 16px;
`;

const MainTextWrapper = styled.div`
  width: 100%;
  height: 96px;

  padding: 12px;

  border: 1px solid #f0f0f0;
  border-radius: 8px;

  background-color: #fbfbfb;
`;

const MainTextTextarea = styled.textarea`
  width: 100%;
  height: 52px;

  font-size: 17px;
  font-weight: 500;

  border: none;

  background-color: transparent;
`;

const MainTextCounter = styled.div`
  color: #999999;
  font-size: 13px;
  font-weight: 400;
  text-align: right;
`;

const OptionsList = styled.ul`
  margin: 16px;
`;

const Option = styled.li``;

const DeleteButton = styled.button``;

const OptionInput = styled.input``;

const OptionInputPlaceholderText = styled.p``;

const OptionInputPlaceholderCounter = styled.p``;

const AppendField = styled.li``;

const AppendIcon = styled.div`
  color: #555555;
  border-color: #555555;
`;

const AppendInput = styled.div``;

const AppendInputPlaceholderText = styled.div`
  color: #333333;
`;
