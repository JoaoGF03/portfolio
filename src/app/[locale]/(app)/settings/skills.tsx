import { useController, useFormContext } from "react-hook-form"

import { SkillInput } from "~/components/skill-input"
import type { ExperienceSchema } from "~/schemas/experience.schema"

export function SkillsInput() {
  const { control } = useFormContext<ExperienceSchema>()

  const {
    field,
    fieldState: { error },
  } = useController({
    name: `skills`,
    control,
    defaultValue: [],
  })

  const { value, onChange } = field

  return (
    <SkillInput value={value} onValueChange={onChange} error={error?.message} />
  )
}
