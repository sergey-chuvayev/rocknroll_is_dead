require 'json'

file = File.read("source.json")
data_hash = JSON.parse(file)

puts data_hash

new_data = []

def timeFormat(date)
    day = date.split[0].to_i < 10 ? date.split[0].prepend('0') : date.split[0]
    month = to_eng(date.split[1])
    year = date.split[2]

    return "#{year}-#{month}-#{day}"

end

def to_eng(ru_month)
    case ru_month
    when 'января'
        return '01'
    when 'февраля'
        return '02'
    when 'марта'
        return '03'
    when 'апреля'
        return '04'
    when 'мая'
        return '05'
    when 'июня'
        return '06'
    when 'июля'
        return '07'
    when 'августа'
        return '08'
    when 'сентября'
        return '09'
    when 'октября'
        return '10'
    when 'ноября'
        return '11'
    when 'декабря'
        return '12'
    end
end

data_hash.each do |d|
    new_data << {
        name: d['name'],
        age: d['age'].to_i,
        death_date: timeFormat(d['date']),
        place: d['place'],
        reason: d['reason']
    }
end


puts new_data

File.open("data_out.json", "w") { |file| 
	file.write(new_data.to_json)
}