export type FormFieldGroupType =
  | 'applicationInfo'          // 지원정보
  | 'personalInfo'             // 인적정보
  | 'summaryInfo'              // 요약정보
  | 'additionalPoints'         // 가산점
  | 'graduateSchool'           // 대학원
  | 'university'               // 대학교
  | 'college'                  // 전문대학
  | 'highSchool'               // 고등학교
  | 'languageTests'            // 외국어시험
  | 'certifications'           // 자격증
  | 'languageSkills'           // 외국어활용능력
  | 'education'                // 교육사항
  | 'itSkills'                 // IT활용 능력
  | 'experiences'              // 경험사항
  | 'career'                   // 경력사항
  | 'additionalInfo'           // 추가정보 (파일/링크)
  | 'careerDescriptions'       // 경력기술서
  | 'selfIntroduction';        // 자기소개서


export interface UsableFormFieldGroup {
  id: string
  title: string
  sort: number
  collapse: boolean
  selected: boolean
  items: { [key: string] : UsableFormField }
}

export interface UsableFormField {
  use: boolean
  field: FormField
}

export interface FormField {
  type: string
  label: string
  // name: string
}
