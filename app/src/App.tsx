import { useState } from "react"
import { DynamicForm } from "./components/dynamic-form-renderer/dynamic-form"
import { FormItemList } from "./components/form-builder/layout/item-list"
import { usableFieldsList } from "./components/form-builder/ui/usable-fields"
import type { FormSection } from "./components/dynamic-form-renderer/types"
import { FormEditor } from "./components/dynamic-form-renderer/form-editor"

const sections: FormSection[] = [
  {
    title: "기본 정보",
    description: "사용자의 기본 정보를 입력해주세요.",
    items: [
      {
        items: [
          {
            type: "text",
            name: "username",
            label: "사용자 이름",
            width: "full",
            required: true,
            description: "공개 닉네임입니다.",
            placeholder: "예: 홍길동",
            min: 2,
            max: 20,
          },
          {
            type: "select",
            name: "gender",
            label: "성별",
            width: "fit",
            required: true,
            items: [
              { name: "남성", value: "male" },
              { name: "여성", value: "female" },
              { name: "기타", value: "other" },
            ],
          },
        ],
      },
      {
        items: [
          {
            type: "radio",
            name: "hasPet",
            label: "반려동물이 있나요?",
            width: "fit",
            required: true,
            items: [
              { name: "예", value: "yes" },
              { name: "아니오", value: "no" },
            ],
          },
          {
            type: "text",
            name: "petName",
            label: "반려동물 이름",
            width: "full",
            placeholder: "예: 코코",
            description: "반려동물이 있는 경우에만 입력해주세요.",
          },
        ],
      },
    ],
  },
  {
    title: "학력 정보",
    description: "최종 학력 정보를 입력해주세요.",
    items: [
      {
        repeatable: true,
        repeatConfig: {
          minItems: 1,
          maxItems: 3,
          allowAdd: true,
          allowRemove: true,
          itemLabel: "학력",
        },
        items: [
          {
            type: "text",
            name: "education.school",
            label: "학교명",
            width: "relative",
            required: true,
          },
          {
            type: "text",
            name: "education.major",
            label: "전공",
            width: "relative",
          },
          {
            type: "select",
            name: "education.level",
            label: "학위",
            width: "fit",
            required: true,
            items: [
              { name: "고졸", value: "highschool" },
              { name: "학사", value: "bachelor" },
              { name: "석사", value: "master" },
              { name: "박사", value: "doctor" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "자기소개",
    items: [
      {
        items: [
          {
            type: "textarea",
            name: "introduction",
            label: "자기소개",
            width: "full",
            required: true,
            placeholder: "200자 이내로 작성해주세요.",
            max: 200,
          },
        ],
      },
    ],
  },
  {
    title: "파일 업로드",
    items: [
      {
        items: [
          {
            type: "file",
            name: "resume",
            label: "이력서 첨부",
            width: "full",
            required: true,
            description: "PDF 형식만 업로드 가능합니다.",
          },
        ],
      },
    ],
  },
]


function App() {
  const [usableItems, setUsableItems] = useState(usableFieldsList)

  return (
    <main className="flex h-screen overflow-hidden">
      <FormItemList
        items={usableItems}
        setItems={setUsableItems}
      />
      <div className='flex-1 overflow-y-auto py-8 bg-secondary'>
        <div className="max-w-screen-lg p-8 mx-auto shadow-md bg-background">
          <FormEditor />
          {/* <DynamicForm
            sections={sections}
            onSubmit={() => { }}
          /> */}
        </div>
      </div>
    </main>
  )

}

export default App
