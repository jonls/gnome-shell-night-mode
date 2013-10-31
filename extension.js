
const Main = imports.ui.main;
const St = imports.gi.St;
const Clutter = imports.gi.Clutter;

let filter, filter_on, button;

function _toggleScreenFilter() {
    if (!filter) {
	filter = new Clutter.ColorizeEffect();
        filter.tint = new Clutter.Color({ red: 255, green: 140, blue: 75 });
        filter_on = false;
    }

    if (!filter_on) {
        Main.uiGroup.add_effect(filter);
    } else {
        Main.uiGroup.remove_effect(filter);
    }

    filter_on = !filter_on;
}

function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'system-run-symbolic',
                             style_class: 'system-status-icon' });

    button.set_child(icon);
    button.connect('button-press-event', _toggleScreenFilter);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
