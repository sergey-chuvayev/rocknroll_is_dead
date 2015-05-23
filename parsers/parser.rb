require 'json'

file = File.read("source.json")
data_hash = JSON.parse(file)

puts data_hash

new_data = []

data_hash.each do |d|
	new_data << {
		name: d['name'],
		age: d['age'].to_i,
		date: d['date'],
		death_year: d['date'].split(//).last(4).join.to_i,
		place: d['place'],
		reason: d['reason']
	}
end

File.open("data_out.json", "w") { |file| 
	file.write(new_data.to_json)
}