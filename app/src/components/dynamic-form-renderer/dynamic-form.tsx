import React from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '../ui/form'
import { FieldRenderer } from './form-renderer'
import { Row } from './layouts/row'
import { Section } from './layouts/section'
import type { FormSection } from './types'

type Props = {
  sections: FormSection[]
  onSubmit: (data: any) => void
}

export const DynamicForm: React.FC<Props> = ({ sections, onSubmit }) => {
  const form = useForm()
  const { handleSubmit } = form

  return (
    <Form {...form}>
      <form className='flex flex-col gap-12' onSubmit={handleSubmit(onSubmit)}>
        {sections.map((section, si) => (
          <Section key={si}>
            <div>
              {section.title && <h2 className='font-semibold'>{section.title}</h2>}
              {section.description && <p className='text-sm text-secondary-foreground'>{section.description}</p>}
            </div>
            {section.items.map((row, ri) => (
              <Row key={ri} className='flex gap-2'>
                {row.items.map((field, fi) => (
                  <FieldRenderer
                    key={fi}
                    fieldConfig={field}
                    control={form.control}
                  />
                ))}
              </Row>
            ))}
          </Section>
        ))}

        <button type="submit">제출</button>
      </form>
    </Form>
  )
}
