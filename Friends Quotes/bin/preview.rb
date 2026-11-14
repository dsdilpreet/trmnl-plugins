require 'trmnlp/context'
require 'fileutils'
require 'open3'

root = File.expand_path('..', __dir__)
context = TRMNLP::Context.new(root)
bundle = File.join(root, 'src', 'transform.js')
javascript = 'const fs = require("node:fs"), vm = require("node:vm"); const script = fs.readFileSync(process.argv[1], "utf8"); console.log(JSON.stringify(vm.runInNewContext(script + "\\n({quotes: QUOTES, result: run(input)})", {input: JSON.parse(process.argv[2])})));'
output, errors, process_status = Open3.capture3('node', '-e', javascript, bundle, JSON.generate(context.user_data))
abort errors unless process_status.success?
data = JSON.parse(output)
quotes = data.fetch('quotes')
fixture = ARGV.first || 'random'
quote = case fixture
        when 'longest' then quotes.max_by { |entry| entry.fetch('text').length }
        when 'shortest' then quotes.min_by { |entry| entry.fetch('text').length }
        when 'empty' then nil
        else data.fetch('result').fetch('quote')
        end

variables = context.user_data.merge('quote' => quote)
context.define_singleton_method(:user_data) { variables }
build = File.join(root, '_build')
FileUtils.mkdir_p(build)
File.write(File.join(build, 'quotes.json'), JSON.generate(quotes))
links = []
devices = {
  'og' => 'screen screen--og screen--md screen--1bit',
  'x' => 'screen screen--v2 screen--lg screen--density-2x screen--4bit'
}
devices.each do |device, classes|
  %w[landscape portrait].each do |orientation|
    screen_classes = classes + (orientation == 'portrait' ? ' screen--portrait' : '')
    %w[full half_horizontal half_vertical quadrant].each do |view|
      html = context.render_full_page(view, screen_classes: screen_classes)
      abort "Liquid error in #{view}" if html.include?('Liquid error') || html.include?('Liquid syntax error')
      html = html.gsub('/latest/', '/3.4.6/')
      filename = "#{device}-#{orientation}-#{view}.html"
      File.write(File.join(build, filename), html)
      links << "<li><a href=\"#{filename}\">#{device.upcase} / #{orientation} / #{view.tr('_', ' ')}</a></li>"
    end
  end
end
File.write(File.join(build, 'preview.html'), "<!doctype html><html lang=\"en\"><meta charset=\"utf-8\"><title>Friends Quotes previews</title><h1>Friends Quotes</h1><ul>#{links.join}</ul></html>")
puts "Built 16 device previews (#{fixture} fixture) in #{build}/preview.html"