json.array! @hardwares.each do |hardware|
  json.id hardware.id
  json.type hardware.type
  json.manufacturer hardware.manufacturer
  json.model hardware.model
  json.serial_number hardware.serial_number
  json.fields hardware.hardware_fields do |field|
    json.name field.name
    json.value field.value
    json.id field.id
  end
end
